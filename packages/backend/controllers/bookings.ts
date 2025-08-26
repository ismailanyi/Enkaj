import { Request, Response } from "express";
import { db } from "../config/db";
import { properties, propertyAgents, users, visitBookings } from "../schema";
import { and, count, eq, gt, gte, sql } from "drizzle-orm";

export class BookingsController {
  constructor() {
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);

    this.agentIsAssignedToProperty = this.agentIsAssignedToProperty.bind(this);
  }

  private async agentIsAssignedToProperty(agentId: number): Promise<boolean> {
    const agntIsAssigned =
      (
        await db
          .select({ count: count() })
          .from(propertyAgents)
          .where(eq(propertyAgents.agentId, agentId))
      )[0].count > 0;

    return !!agntIsAssigned;
  }

  async create(req: Request, res: Response) {
    try {
      if (!req.body.propertyId || !req.body.selectedAgent) {
        res.status(400).json({ error: "Missing necessary values" });
        return;
      }

      // Parse and validate the date
      if (isNaN(new Date(req.body.visitDate).getTime())) {
        res.status(400).json({ error: "Invalid date format" });
        return;
      }

      // can check if that agent is actually assigned to said property
      if (!(await this.agentIsAssignedToProperty(req.body.selectedAgent))) {
        res.status(403).json({ error: "Agent not assigned to this property" });
        return;
      }

      const visitorId = req.body.visitorId || 7;

      // check if booking is already there

      const minBookingsApart = 2;
      const twoHoursAgo = new Date();
      twoHoursAgo.setHours(twoHoursAgo.getHours() - minBookingsApart);

      const alreadyExists =
        (
          await db
            .select({ count: count() })
            .from(visitBookings)
            .where(
              and(
                eq(visitBookings.visitorId, visitorId),
                eq(visitBookings.propertyId, req.body.propertyId),
                eq(visitBookings.selectedAgent, req.body.selectedAgent),

                //TODO: not quite there yet
                //booking cannot be less that 2 hours apart, of the same agent
                gte(visitBookings.visitDate, twoHoursAgo)
              )
            )
        )[0].count > 1;

      if (alreadyExists) {
        res.status(409).json({ error: "This booking already exists" });
        return;
      }

      const [{ insertId }] = await db.insert(visitBookings).values({
        ...req.body,
        visitorId: visitorId, //TODO: only admin or guest can create // can be logged in user ID who is a visitor
        visitDate: new Date(req.body.visitDate),
      });

      res.status(201).json({ bookingId: insertId });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Failed to save booking" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      if (req.body.visitDate) {
        if (isNaN(new Date(req.body.visitDate).getTime())) {
          res.status(400).json({ error: "Invalid date format" });
          return;
        }

        req.body.visitDate = new Date(req.body.visitDate);
      }

      if (req.body.selectedAgent) {
        if (!(await this.agentIsAssignedToProperty(req.body.selectedAgent))) {
          res
            .status(403)
            .json({ error: "Agent not assigned to this property" });
          return;
        }
      }

      const updateWhere = () => {
        // only visitor can update their own booking or an Admin
        const baseWhere = eq(visitBookings.propertyId, Number(req.params.id));

        // return baseWhere;
        if (req.user?.userType === "Admin") return baseWhere;

        return and(
          baseWhere,
          eq(visitBookings.visitorId, Number(req.user?.id || -1))
        );
      };

      const [{ affectedRows }] = await db
        .update(visitBookings)
        .set(req.body)
        .where(updateWhere());

      if (affectedRows < 1) {
        res.status(204).send();
        return;
      }

      res.json({ message: "Updated successfully" });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Failed to update booking" });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const filters = [];

      if (req.query.visitorId) {
        filters.push(eq(visitBookings.visitorId, Number(req.query.visitorId)));
      }

      if (req.query.propertyId) {
        filters.push(
          eq(visitBookings.propertyId, Number(req.query.propertyId))
        );
      }

      if (req.query.selectedAgent) {
        filters.push(
          eq(visitBookings.selectedAgent, Number(req.query.selectedAgent))
        );
      }

      const bookingsList = (
        await db
          .select({
            propertyName: properties.name,
            propertySlug: properties.slug,
            bookingDate: visitBookings.visitDate,
            agent: {
              name: users.name,
              email: users.email,
              phone: users.phone,
            },
          })
          .from(visitBookings)
          .innerJoin(users, eq(visitBookings.visitorId, users.id))
          .innerJoin(properties, eq(visitBookings.propertyId, properties.id))
          .where(and(...filters))
      ).filter((result) =>
        Object.values(result).some((value) => value !== null)
      );

      res.json(bookingsList);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Failed to get booking(s)" });
    }
  }

  async cancelB(req: Request, res: Response) {
    try {
      const deleteWhere = () => {
        // only visitors delete their own bookings / Admin
        const baseWhere = eq(visitBookings.propertyId, Number(req.params.id));

        // return baseWhere;

        if (req.user?.userType === "Admin") return baseWhere;

        return and(
          baseWhere,
          eq(visitBookings.visitorId, Number(req.user?.id || -1))
        );
      };

      const [{ affectedRows }] = await db
        .delete(visitBookings)
        .where(deleteWhere());

      if (affectedRows < 1) {
        res.status(204).send();
        return;
      }

      res.json({ message: "Booking deleted" });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Failed to delete" });
    }
  }
}
