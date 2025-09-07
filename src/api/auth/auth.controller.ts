import { Request, Response, NextFunction } from "express";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "../../config/env";
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      next({
        status: 400,
        message: "missing creds",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({ username, passwaord: hashedPassword });

    const payload = { userId: newUser._id, username: username };
    const secret = env.JWT_SECRET;
    const options = { expiresIn: env.JWT_EXP } as jwt.SignOptions;
    const token = jwt.sign(payload, secret as string, options);

    res.status(201).json({
      username: username,
      password: hashedPassword,
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
  } catch (err) {
    next(err);
  }
};
