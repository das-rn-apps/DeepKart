import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { id: string };
    }
  }
}

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ message: "Access denied. No token provided." });
    return;
  }

  try {
    if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not defined.");
    req.user = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload & {
      id: string;
    };
    next();
  } catch {
    res.status(401).json({ message: "Invalid token." });
  }
};
