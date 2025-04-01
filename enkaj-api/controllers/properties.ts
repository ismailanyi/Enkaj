import { Request, Response } from "express";
import { db } from "../config/db";
import { properties, propertyRatings, savedProperties } from "../schema";
import {
  and,
  count,
  eq,
  getTableColumns,
  gte,
  inArray,
  lte,
  or,
  sql,
} from "drizzle-orm";
import { ListingType, PriceType, PropertyStatus, PropertyType } from "../types";
import { sanitizeSlug } from "../utils/text";
import { deleteCloudinaryImages } from "../utils/cloudinary/deleteImages";
import { CLOUDINARY_IMG_URL } from "../constants";

export class PropertiesController {
  constructor() {
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);

    this.isSlugTaken = this.isSlugTaken.bind(this);
  }

  private async isSlugTaken(
    slug: string,
    timesUsed: number = 0 // times used
  ): Promise<boolean> {
    const existing =
      (
        await db
          .select({ count: count() })
          .from(properties)
          .where(eq(properties.slug, slug))
      )[0].count > timesUsed;

    return !!existing;
  }

  async create(req: Request, res: Response) {
    try {
      req.body.slug = sanitizeSlug(req.body.name);

      if (req.body.features) {
        if (!Array.isArray(req.body.features)) {
          req.body.features = JSON.parse(req.body.features);
        }
      }

      if (req.body.media) {
        if (!Array.isArray(req.body.media)) {
          req.body.media = JSON.parse(req.body.media);
        }
      }

      if (await this.isSlugTaken(req.body.slug)) {
        res.status(409).json({ error: "Property name is already taken" });
        return;
      }

      const newProperty = (await db.insert(properties).values(req.body))[0];

      res.status(201).json({ propertyId: newProperty["insertId"] });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Failed to create property" });
    }
  }

  async search(req: Request, res: Response) {
    try {
      // const authedUser = req?.user as any;

      const oneSpecificDeal = req.query.id || req.params.id || req.query.slug;
      const {
        location,
        propertyType,
        minPrice,
        maxPrice,
        mode = oneSpecificDeal ? "detailed" : "list", // for list, just return amin data, other wide full details
      } = req.query;

      const filters = [];

      if (req.query.id || req.params.id) {
        filters.push(
          eq(properties.id, Number(req.query.id || req.params.id || -1))
        );
      }

      if (req.query.name) {
        filters.push(eq(properties.name, req.query.name as string));
      }

      if (req.query.slug) {
        filters.push(eq(properties.slug, req.query.slug as string));
      }

      if (location) {
        filters.push(eq(properties.location, location as string));
      }

      if (propertyType) {
        filters.push(
          inArray(
            properties.propertyType,
            ((propertyType as PropertyType)?.split(",") || []) as PropertyType[]
          )
        );
      }

      if (req.query.listingType) {
        filters.push(
          eq(properties.listingType, req.query.listingType as ListingType)
        );
      }

      if (minPrice) {
        filters.push(gte(properties.price, Number(minPrice)));
      }

      if (maxPrice) {
        filters.push(lte(properties.price, Number(maxPrice)));
      }

      if (req.query.priceType) {
        filters.push(
          eq(properties.priceType, req.query.priceType as PriceType)
        );
      }

      if (req.query.minBedrooms) {
        filters.push(gte(properties.bedrooms, Number(req.query.minBedrooms)));
      }

      if (req.query.maxBedrooms) {
        filters.push(lte(properties.bedrooms, Number(req.query.maxBedrooms)));
      }

      if (req.query.features) {
        const ftsList: string[] = String(req.query.features)
          .split(",")
          .map((v) => decodeURIComponent(v));

        const categoryFilters = ftsList.map(
          (category) =>
            sql`JSON_CONTAINS(${properties.features}, ${JSON.stringify(
              category
            )})`
        );

        if (categoryFilters.length > 0) filters.push(or(...categoryFilters));

        /*  filters.push(
          sql`JSON_OVERLAPS(${properties.features}, ${JSON.stringify(ftsList)})`
        ); */
      }

      /*  if (req.query.minArea) {
        filters.push(gte(properties.area, Number(req.query.minArea)));
      }

      if (req.query.maxArea) {
        filters.push(lte(properties.area, Number(req.query.maxArea)));
      }
 */
      if (req.query.status) {
        filters.push(eq(properties.status, req.query.status as PropertyStatus));
      }

      if (req.query.bookmarked_by) {
        filters.push(
          eq(savedProperties.userID, Number(req.query.bookmarked_by))
        );
      }

      const determineFldsToRtrn = () => {
        if (mode === "list") {
          return {
            id: properties.id,
            name: properties.name,
            // TODO: If user is not an admin

            // ...(!!authedUser &&
            //   authedUser?.userType !== "Admin" && {
            description: properties.description,
            // }),

            slug: properties.slug,
            media: properties.media,
            location: properties.location,
            propertyType: properties.propertyType,
            listingType: properties.listingType,
            price: properties.price,
            bedrooms: properties.bedrooms,
            bathrooms: properties.bathrooms,
            area: properties.area,
            priceType: properties.priceType,
            status: properties.status,
          };
        }

        return getTableColumns(properties);
      };

      let query = db
        .select({
          ...determineFldsToRtrn(),
          rating: sql<number>`COALESCE(ROUND(AVG(${propertyRatings.rating}), 1), 0)`,
          // totalRatings: sql<number>`COALESCE(COUNT(${propertyRatings.id}), 0)`,
        })
        .from(properties)
        .leftJoin(
          propertyRatings,
          eq(properties.id, propertyRatings.propertyId)
        )
        .groupBy(properties.id);

      if (req.query.bookmarked_by) {
        query = query.innerJoin(
          savedProperties,
          eq(properties.id, savedProperties.propertyId)
        );
      }

      const results = (await query.where(and(...filters))).filter((result) => {
        const { rating, ...rest } = result;

        // Filter out all null values, coz of the inner join
        return Object.values(rest).some((value) => value !== null);
      });

      const totalProperties = (
        await db
          .select({ count: count() })
          .from(properties)
          .where(and(...filters))
      )[0].count;

      res.setHeader("x-total-count", totalProperties);
      res.setHeader("access-control-expose-headers", "X-Total-Count");

      if (results.length < 1) {
        res.json(results);
        return;
      }

      const formattedReslts = structuredClone(results).map((p: any) => ({
        ...p,

        ...(p?.features && {
          features: JSON.parse(String(p.features)),
        }),

        ...(p.media && {
          media: (JSON.parse(String(p.media)) as string[]).map(
            (img) => `${CLOUDINARY_IMG_URL}/${img}`
          ),
        }),

        ...(p?.rating && {
          rating: Number(p.rating),
        }),
      }));

      // if there was a 'req.query.id' that means that its 1 property only being gotten
      res.json(oneSpecificDeal ? formattedReslts[0] : formattedReslts);
    } catch (error) {
      console.log("error Searching properties", error);
      res.status(500).json({ error: "Failed to search properties" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      if (req.body.name) {
        req.body.slug = sanitizeSlug(req.body.name);

        if (await this.isSlugTaken(req.body.slug, 1)) {
          res.status(409).json({ error: "Property name is already taken" });
          return;
        }
      }

      if (req.body.features) {
        if (!Array.isArray(req.body.features)) {
          req.body.features = JSON.parse(req.body.features);
        }
      }

      if (req.body.media) {
        if (!Array.isArray(req.body.media)) {
          req.body.media = JSON.parse(req.body.media);
        }
      }

      const updated = (
        await db
          .update(properties)
          .set(req.body)
          .where(eq(properties.id, Number(req.params.id)))
      )[0];

      if (!(updated["affectedRows"] > 0)) {
        res.status(404).json({ error: "Property not found" });
        return;
      }

      res.json({ message: "Updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to update property" });
    }
  }

  async bookmark(req: Request, res: Response) {
    try {
      const { propertyId } = req.body;
      const userId = 1;

      if (!propertyId) {
        res.status(400).json({ error: "Missing needed values" });
        return;
      }

      const BaseAnd = and(
        eq(savedProperties.propertyId, propertyId),
        eq(savedProperties.userID, userId)
      );

      // Check if user already bookmarked this property
      const existingBookMark = await db.query.savedProperties.findFirst({
        where: BaseAnd,
      });

      if (existingBookMark) {
        await db.delete(savedProperties).where(BaseAnd);
      } else {
        await db.insert(savedProperties).values({
          propertyId,
          userID: userId,
        });
      }

      res.json({
        message: `Property ${!existingBookMark ? "saved" : "unsaved"}`,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "An error occured when saving/unsaving property" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const propertyToDelete = Number(req.params.id);

      if (!propertyToDelete) {
        res.status(400).json({ error: "Missing property ID" });
        return;
      }

      // 1st find proerty so I can get the image

      const propertyToDel = (
        await db
          .select({ media: properties.media })
          .from(properties)
          .where(eq(properties.id, propertyToDelete))
      )[0];

      if (!propertyToDel) {
        res.status(404).json({ error: "Property not found" });
        return;
      }

      if (
        propertyToDel.media &&
        JSON.parse(String(propertyToDel.media)).length > 0
      ) {
        await deleteCloudinaryImages(JSON.parse(String(propertyToDel.media)));
      }

      const deleted = (
        await db.delete(properties).where(eq(properties.id, propertyToDelete))
      )[0];

      if (!(deleted["affectedRows"] > 0)) {
        res.status(204).send();
        return;
      }

      res.json({ message: "Deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to delete property" });
    }
  }
}
