import { Request, Response, NextFunction } from "express";
import { AuthInvalidCredentialsError } from "../../../../Auth/domain/errors";
import { verifyToken } from "./utils";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.access_token;

  try {
    if (!token) {
      throw new AuthInvalidCredentialsError("Access denied: No token provided");
    }

    const decoded = verifyToken(token);
    const { id, name, email, imageUrl } = decoded;

    req.user = { id, name, email, imageUrl };

    next();
  } catch (error) {
    next(error);
  }
};
