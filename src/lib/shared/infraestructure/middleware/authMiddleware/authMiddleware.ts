import { Request, Response, NextFunction } from "express";
import { AuthInvalidCredentialsError } from "../../../../Auth/domain/errors";
import { OmitUser, verifyToken } from "./utils";
import { UserId } from "../../../../User/domain/Props/UserId";
import { UserName } from "../../../../User/domain/Props/UserName";
import { UserEmail } from "../../../../User/domain/Props/UserEmail";
import { ImageUrl } from "../../../../Image/domain/props/ImageUrl";

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

    req.user = new UserOmitThings(
      new UserId(id),
      new UserName(name),
      new UserEmail(email),

      new ImageUrl(imageUrl)
    );

    next();
  } catch (error) {
    next(error);
  }
};

// es para que no se use password
class UserOmitThings implements OmitUser {
  id: UserId;
  name: UserName;
  email: UserEmail;
  imageUrl: ImageUrl;

  constructor(
    id: UserId,
    name: UserName,
    email: UserEmail,
    imageUrl: ImageUrl
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.imageUrl = imageUrl;
  }
}
