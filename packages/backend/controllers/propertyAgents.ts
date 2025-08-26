import { Request, Response } from "express";
import { propertyAgents, users } from "../schema";
import { eq, and, count, SQL, or } from "drizzle-orm";
import { db } from "../config/db";
import { PropertyAgent } from "../types";

export class PropertyAgentsController {
  assign = async (req: Request, res: Response): Promise<void> => {
    try {
      const toAssign = (req.body.toAssign ?? [req.body]) as PropertyAgent[];

      if (toAssign.length < 1) {
        res.status(400).json({ error: "No agents to assign" });
        return;
      }

      let totalAssigned = 0;

      for (const listing of toAssign) {
        // 1st check if agent is already assigned

        const isAlreadyAssigned =
          (
            await db
              .select({ count: count() })
              .from(propertyAgents)
              .where(
                and(
                  eq(propertyAgents.propertyId, Number(listing.propertyId)),
                  eq(propertyAgents.agentId, Number(listing.agentId))
                )
              )
          )[0].count > 0;

        if (isAlreadyAssigned) continue;

        // Make sure that its really a agent who is being assigned to a property
        const isAnAgent = await db
          .select({ count: count() })
          .from(users)
          .where(
            and(
              eq(users.userType, "Agent"),
              eq(users.id, Number(listing.agentId))
            )
          );

        if (!isAnAgent) continue;

        try {
          const [{ affectedRows }] = await db.insert(propertyAgents).values({
            propertyId: Number(listing.propertyId),
            agentId: Number(listing.agentId),
          });

          if (affectedRows > 0) totalAssigned++;
        } catch (error) {
          console.log(
            "An error occurred when assigning agent to property",
            error
          );

          continue;
        }
      }

      if (totalAssigned === 0) {
        console.log({ message: "No agents to assign" });
        res.status(204).send();
        return;
      }

      res.json({
        success: true,
        message: `Total of ${totalAssigned} agent(s) assigned`,
      });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error: "Failed to assign agent(s)" });
    }
  };

  find = async (req: Request, res: Response): Promise<void> => {
    try {
      const buildWhere = () => {
        const filters: any = [];

        if (req.query.propertyId) {
          filters.push(
            eq(propertyAgents.propertyId, Number(req.query.propertyId))
          );
        }

        if (filters.length < 1) return undefined;
        return and(...filters);
      };

      const assignedAgents = await db
        .select({
          id: users.id,
          name: users.name,
          userType: users.userType,
          phone: users.phone,
        })
        .from(propertyAgents)
        .innerJoin(users, eq(propertyAgents.agentId, users.id))
        .where(buildWhere());

      res.json(assignedAgents);
    } catch (error) {
      res.status(500).json({ error: "Failed to find property agents" });
    }
  };

  unassign = async (req: Request, res: Response): Promise<void> => {
    try {
      const agentId =
        req.body.agentId ||
        req.params.id.split("&")?.[0]?.split("agentId=")?.[1];

      const propertyId =
        req.body.propertyId ||
        req.params.id.split("&")?.[1]?.split("propertyId=")?.[1];

      const [{ affectedRows }] = await db
        .delete(propertyAgents)
        .where(
          and(
            eq(propertyAgents.propertyId, Number(propertyId)),
            eq(propertyAgents.agentId, Number(agentId))
          )
        );

      if (affectedRows < 1) {
        res.status(204).send();

        return;
      }

      res.json({ message: "Successfully unassigned agent" });
    } catch (error) {
      res.status(500).json({ error: "Failed to unassign agent" });
    }
  };
}
