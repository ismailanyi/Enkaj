import { Request, Response } from "express";
import { propertyAgents, users } from "../schema";
import {
  and,
  count,
  desc,
  eq,
  getTableColumns,
  inArray,
  or,
  sql,
} from "drizzle-orm";
import bcrypt from "bcrypt";
import { db } from "../config/db";
import { UserType } from "../types";
import { AuthController } from "../utils/auth";
import reverseString, { genPswd } from "../utils/text";

const authCtrl = new AuthController();

export class UsersController {
  constructor() {
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);

    this.userExists = this.userExists.bind(this);
    this.isEmailTaken = this.isEmailTaken.bind(this);
  }

  private async userExists(
    name: string,
    utype: string,
    timesUsed: number = 0 // times used
  ): Promise<boolean> {
    const existing =
      (
        await db
          .select({ count: count() })
          .from(users)
          .where(
            and(eq(users.name, name), eq(users.userType, utype as UserType))
          )
      )[0].count > timesUsed;

    return !!existing;
  }

  private async isEmailTaken(
    email: string,
    timesUsed: number = 0
  ): Promise<boolean> {
    const existing =
      (
        await db
          .select({ count: count() })
          .from(users)
          .where(eq(users.email, email))
      )[0].count > timesUsed;

    return !!existing;
  }

  async create(req: Request, res: Response) {
    try {
      const { password, ...userData } = req.body;

      const userSession: { userType: UserType } = { userType: "Admin" };

      // const usersToInsert = || []

      if (await this.isEmailTaken(req.body.email)) {
        res.status(409).json({ error: "Email is already in use" });
        return;
      }

      if (await this.userExists(req.body.name, req.body.email)) {
        res.status(409).json({ error: "User already exists" });
        return;
      }

      const newPwd = await bcrypt.hash(password ?? genPswd(), 10);

      const newUser = (
        await db.insert(users).values({
          ...userData,
          password: newPwd,
        })
      )[0];

      const userObj = {
        id: newUser["insertId"],
        name: userData.name,
        email: userData.email,
        user_type: userData.userType,

        ...(userData.image && {
          avatar: userData.image,
        }),
      };

      res.status(201).json({
        user: userObj,

        ...(userSession.userType !== "Admin" && {
          token: reverseString(authCtrl.generateToken(userObj)),
        }),
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create user" });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    const usernameOrEmail = req.body.name || req.body.email;

    const foundUser = (
      await db
        .select({
          id: users.id,
          password: users.password,
          email: users.email,
          name: users.name,
          userType: users.userType,
          image: users.image,
        })
        .from(users)
        .where(
          or(eq(users.name, usernameOrEmail), eq(users.email, usernameOrEmail))
        )
    )[0];

    if (!foundUser) {
      res.status(401).json({ error: "Account not found" });
      return;
    }

    const correctPwd = await authCtrl.validateCredentials(
      foundUser.password,
      req.body.password
    );

    if (!correctPwd.isValid) {
      res
        .status(401)
        .json({ error: correctPwd?.error || "Incorrect password" });
      return;
    }

    const userObj = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      user_type: foundUser.userType,

      ...(foundUser.image && {
        avatar: foundUser.image,
      }),
    };

    res.json({
      user: userObj,

      ...(foundUser.userType !== "Admin" && {
        token: reverseString(authCtrl.generateToken(userObj)),
      }),
    });

    return;
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const filters = [];

      if (req.query.userType) {
        filters.push(
          inArray(
            users.userType,
            ((req.query.userType as UserType)?.split(",") || []) as UserType[]
          )
        );
      }

      if (req.query.name) {
        // filters.push(eq(users.name, String(req.query.name)));
        filters.push(
          sql`LOWER(${users.name}) LIKE LOWER(${
            "%" + String(req.query.name) + "%"
          })`
        );
      }

      if (req.query.email) {
        filters.push(eq(users.email, String(req.query.email)));
      }

      if (req.query.phone) {
        filters.push(eq(users.phone, String(req.query.phone)));
      }

      if (req.query.propertyId) {
        filters.push(
          eq(propertyAgents.propertyId, Number(req.query.propertyId))
        );
      }

      const { password, ...userFields } = getTableColumns(users);

      // === START OF: USER COUNT QUERY ===
      let userCountQuery = db.select({ count: count() }).from(users);

      if (req.query.propertyId) {
        userCountQuery.innerJoin(
          propertyAgents,
          eq(users.id, propertyAgents.agentId)
        );
      }

      const totalUsers = (await userCountQuery.where(and(...filters)))[0].count;

      /* const totalUsers = (
        await db
          .select({ count: count() })
          .from(users)
          .where(and(...filters))
      )[0].count; */

      let query = db.select(userFields).from(users);

      if (req.query.propertyId) {
        query.innerJoin(propertyAgents, eq(users.id, propertyAgents.agentId));
      }
      /*   const results = await db
        .select(userFields)
        .from(users)
        .where(and(...filters))
        .orderBy(desc(users.id)); */

      const results = await query
        .where(and(...filters))
        .orderBy(desc(users.id));

      res.setHeader("x-total-count", totalUsers);
      res.setHeader("access-control-expose-headers", "X-Total-Count");

      res.json(results);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const user = await db.query.users.findFirst({
        where: eq(users.id, parseInt(req.params.id)),
      });

      if (!user) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      if (req.body.email) {
        if (await this.isEmailTaken(req.body.email, 1)) {
          res.status(409).json({ error: "Email is already in use" });
          return;
        }
      }

      if (req.body.userType && req.body.name) {
        if (await this.userExists(req.body.name, req.body.userType)) {
          res.status(409).json({ error: "User already exists" });
          return;
        }
      }

      const updated = (
        await db
          .update(users)
          .set({
            ...req.body,

            ...(req.body.password && {
              password: await bcrypt.hash(req.body.password, 10),
            }),
          })
          .where(eq(users.id, Number(req.params.id)))
      )[0];

      if (!(updated["affectedRows"] > 0)) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.json({ message: "Updated successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to update user" });
    }
  }

  async deleteUser(req: Request, res: Response) {
    try {
      const deleted = (
        await db.delete(users).where(eq(users.id, Number(req.params.id)))
      )[0];

      if (!(deleted["affectedRows"] > 0)) {
        res.status(204).send();
        return;
      }

      res.json({ message: "Deleted successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  }
}
