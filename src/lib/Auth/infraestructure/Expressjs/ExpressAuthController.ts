import { NextFunction, Request, Response } from "express";
// import { ServiceContainer } from "../../Shared/infrastructure/ServiceContainer";
// import { UserNotFoundError } from "../domain/UserNotFoundError";
import { ServiceContainer } from "../../../shared/ServiceContainer";
import { AuthInvalidCredentialsError } from "../../domain/errors";
// import { roles } from "../../../User/UserTypes";
import { login, register, update } from "./ExpressAuthProps";
// import { UserImageUrl } from "../../../User/domain/Props/UserImageUrl";
// import { roles } from "../../UserTypes";

export class ExpressAuthController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    const { name, password, email }: register = req.body;

    try {
      await ServiceContainer.auth.register.run(
        name,
        email,
        password,
        req.file?.buffer
        // userAuthenticatedRole
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    // let imageUrl: string = "";

    // if (req.file) {
    //   const file = req.file.buffer;
    //   const user = await ServiceContainer.user.getOneById.run(req.body.id);
    //   await ServiceContainer.image.imageDelete.run(user.imageUrl.value);
    //   imageUrl = await ServiceContainer.image.imageUpload.run(file);
    // }

    const { name, password, email }: update = req.body;

    if (!req.user) {
      throw new Error("User ID is required");
    }

    try {
      await ServiceContainer.auth.update.run(
        req.user.id.value,
        name,
        email,
        password,
        req.file?.buffer
        // userAuthenticatedRole
      );

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    const { password, email }: login = req.body;

    try {
      const token = await ServiceContainer.auth.login.run(email, password);

      res
        .status(200)
        .cookie("access_token", token.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 60,
        })
        .json({
          token: token.token,
        });
    } catch (error) {
      next(error);
    }
  };

  protectedRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new AuthInvalidCredentialsError(
          "Access denied: User not authenticated"
        );
      }

      res.status(200).json({
        data: {
          id: req.user.id,
          username: req.user.name,
          email: req.user.email,
          imageUrl: req.user.imageUrl,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  adminRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.user) {
        throw new AuthInvalidCredentialsError(
          "Access denied: User not authenticated"
        );
      }

      res.status(200).json({
        data: {
          id: req.user.id,
          username: req.user.name,
          email: req.user.email,
          imageUrl: req.user.imageUrl,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  logout = (req: Request, res: Response, next: NextFunction) => {
    try {
      res.clearCookie("access_token").json({ message: "Logout successful" });
    } catch (error) {
      next(error);
    }
  };
}
