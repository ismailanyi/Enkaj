import { Request, Response } from "express";
import { db } from "../config/db";
import { and, count, eq, gt, gte, sql } from "drizzle-orm";
import { waitlist } from "../schema";

export class WaitlistController {
  async create(req: Request, res: Response) {
    try {
      if (!req.body.email) {
        res.status(400).json({ error: "Missing email address" });
        return;
      }

      const alreadyExists = (
        await db
          .select({ count: count() })
          .from(waitlist)
          .where(eq(waitlist.email, req.body.email))
      )[0].count;

      if (alreadyExists) {
        res.status(409).json({ error: "Email already in waitlist" });
        return;
      }

      const newWaitlist = await db.insert(waitlist).values(req.body);

      if (!(newWaitlist[0].affectedRows > 0)) {
        res.status(400).json({ error: "Failed to add to waitlist" });
        return;
      }

      res.status(201).json({ message: "Added to waitlist" });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Failed to add to waitlist" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const updated = (
        await db
          .update(waitlist)
          .set(req.body)
          .where(eq(waitlist.email, req.params.email))
      )[0];

      if (!(updated.affectedRows > 0)) {
        res.status(204).json({ message: "No record updated" });
        return;
      }

      res.json({ message: "Updated successfully" });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Failed to update waitlist email" });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const filters: any = [];

      const buildWhere = () => {
        return and(...filters);
      };

      const waitlistMails = await db
        .select()
        .from(waitlist)
        .where(buildWhere());

      res.json(waitlistMails);
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Failed to get waitlist" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const deleted = (
        await db.delete(waitlist).where(eq(waitlist.email, req.params.email))
      )[0];

      if (!(deleted.affectedRows > 0)) {
        res.status(204).json({ message: "No record deleted" });
        return;
      }

      res.json({ message: "Deleted successfully" });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Failed to delete from waitlist" });
    }
  }
}
