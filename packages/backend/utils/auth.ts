// src/controllers/auth.controller.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { UserType } from "../types";

import * as dotenv from "dotenv";
dotenv.config();

type JWT = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  user_type: UserType;
};

export class AuthController {
  generateToken(user: JWT) {
    return jwt.sign(
      {
        id: user.id,
        userType: user.user_type,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "24h" }
    );
  }

  async validateCredentials(
    hashedPwd: string,
    password: string
  ): Promise<{ isValid: boolean; error?: string }> {
    const isValidPassword = await bcrypt.compare(password, hashedPwd);

    if (!isValidPassword) {
      return { isValid: false, error: "Incorrect password" };
    }

    return { isValid: true };
  }

  async refreshToken(req: Request, res: Response) {
    try {
      res.json("ok");
    } catch (error) {
      res.status(500).json({
        error: "Token refresh failed",
      });
    }
  }
}
