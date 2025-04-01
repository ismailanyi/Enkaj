import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserType } from "../types";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        userType: UserType;
      };
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const authorize = (roles: UserType[]) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    if (!req.user || !roles.includes(req.user.userType)) {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }
    next();
  };
};
