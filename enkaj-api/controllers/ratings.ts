import { Request, Response, NextFunction } from "express";
import { properties, propertyRatings } from "../schema";
import { eq, and, avg, count } from "drizzle-orm";
import { db } from "../config/db";

export class RatingsController {
  rate = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { propertyId, rating } = req.body;
      const userId = 16;
      // const userId = req.user!.id;

      if (rating < 0 || rating > 5) {
        res.status(400).json({ error: "Rating must be between 0 and 5" });
        return;
      }

      // Check if user already rated this property
      const existingRating = await db.query.propertyRatings.findFirst({
        where: and(
          eq(propertyRatings.propertyId, propertyId),
          eq(propertyRatings.userId, userId)
        ),
      });

      if (existingRating) {
        await db
          .update(propertyRatings)
          .set({ rating, updatedAt: new Date() })
          .where(eq(propertyRatings.id, existingRating.id));
      } else {
        await db.insert(propertyRatings).values({
          propertyId,
          userId,
          rating,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      // Calculate new average
      const [{ averageRating }] = await db
        .select({
          averageRating: avg(propertyRatings.rating),
        })
        .from(propertyRatings)
        .where(eq(propertyRatings.propertyId, propertyId));

      // Update property rating
      /*  await db
        .update(properties)
        .set({ rating: Number(averageRating || 0) }) // Rounds to nearest 0.5
        // .set({ rating: Math.round(averageRating * 2) / 2 }) // Rounds to nearest 0.5
        .where(eq(properties.id, propertyId)); */

      res.json({ success: true, averageRating });
    } catch (error) {
      next(error);
    }
  };

  getPropertyRating = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const propertyId = parseInt(req.params.propertyId);

      const [{ averageRating, totalRatings }] = await db
        .select({
          averageRating: avg(propertyRatings.rating),
          totalRatings: count(propertyRatings.id),
        })
        .from(propertyRatings)
        .where(eq(propertyRatings.propertyId, propertyId));

      res.json({
        averageRating: Number(averageRating || 0),
        // averageRating: Math.round(averageRating * 2) / 2,
        totalRatings,
      });
    } catch (error) {
      next(error);
    }
  };
}
