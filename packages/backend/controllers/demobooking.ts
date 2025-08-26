import { Request, Response } from "express";
import { db } from "../config/db";
import { and, count, eq, gt, gte, lte, sql } from "drizzle-orm";
import { demoBooking } from "../schema";
import toKenyanTime from "../utils/time/toKenyanTime";

export class DemoBookingController {
  async create(req: Request, res: Response) {
    try {
      if (!req.body.email || !req.body.name || !req.body.demoDate) {
        res.status(400).json({ error: "Missing details" });
        return;
      }

      const hasAnotherBookingOnSameDay = () => {
        const startOfDay = new Date(req.body.demoDate);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(req.body.demoDate);
        endOfDay.setHours(23, 59, 59, 999);

        return and(
          eq(demoBooking.email, req.body.email),
          and(
            gte(demoBooking.demoDate, startOfDay),
            lte(demoBooking.demoDate, endOfDay)
          )
        );
      };

      const alreadyExists = (
        await db
          .select({ count: count() })
          .from(demoBooking)
          .where(hasAnotherBookingOnSameDay())
      )[0].count;

      if (alreadyExists) {
        res.status(409).json({ error: "Booking already exists for this day" });
        return;
      }

      const newDemoBooking = await db.insert(demoBooking).values({
        ...req.body,
        demoDate: toKenyanTime(req.body.demoDate),
      });

      if (!(newDemoBooking[0].affectedRows > 0)) {
        res.status(400).json({ error: "Failed to add to demo booking" });
        return;
      }

      res.status(201).json({ message: "Booking saved" });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Failed to save booking" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updated = (
        await db
          .update(demoBooking)
          .set({
            ...req.body,
            ...(req.body.demoDate && {
              demoDate: toKenyanTime(req.body.demoDate),
            }),
          })
          .where(eq(demoBooking.id, Number(req.params.id)))
      )[0];

      if (!(updated.affectedRows > 0)) {
        res.status(204).json({ message: "No record updated" });
        return;
      }

      res.json({ message: "Updated successfully" });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Failed to update demo details" });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const filters = [];

      if (req.params?.email) {
        filters.push(eq(demoBooking.email, req.params.email));
      }

      if (req.params?.name) {
        filters.push(eq(demoBooking.name, req.params.name));
      }

      if (req.params?.on) {
        const startOfDay = new Date(req.params.on);
        startOfDay.setHours(0, 0, 0, 0);

        const endOfDay = new Date(req.params.on);
        endOfDay.setHours(23, 59, 59, 999);

        filters.push(
          and(
            gte(demoBooking.demoDate, startOfDay),
            lte(demoBooking.demoDate, endOfDay)
          )
        );
      }

      if (req.params?.before) {
        filters.push(gt(demoBooking.demoDate, new Date(req.params.before)));
      }

      if (req.params?.after) {
        filters.push(gt(demoBooking.demoDate, new Date(req.params.after)));
      }

      const waitlistMails = await db
        .select()
        .from(demoBooking)
        .where(and(...filters));

      res.json(waitlistMails);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Failed to get demo bookings" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deleted = (
        await db
          .delete(demoBooking)
          .where(eq(demoBooking.id, Number(req.params.id)))
      )[0];

      if (!(deleted.affectedRows > 0)) {
        res.status(204).json({ message: "No record deleted" });
        return;
      }

      res.json({ message: "Deleted successfully" });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Failed to delete demo booking" });
    }
  }
}
