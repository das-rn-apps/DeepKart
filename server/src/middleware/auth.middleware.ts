import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Extend Express Request globally (better than using `CustomRequest`)
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { id: string }; // Ensures `id` exists
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
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables.");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload & {
      id: string;
    };
    req.user = decoded;

    next();
  } catch (error) {
    console.log("Invalid token.");
    res.status(401).json({ message: "Invalid token." });
  }
};
