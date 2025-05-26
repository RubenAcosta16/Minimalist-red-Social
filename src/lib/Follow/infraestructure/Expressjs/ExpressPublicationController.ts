import { NextFunction, Request, Response } from "express";
// import { ServiceContainer } from "../../Shared/infrastructure/ServiceContainer";
// import { UserNotFoundError } from "../domain/UserNotFoundError";
import { ServiceContainer } from "../../../shared/ServiceContainer";
import { FollowDTO } from "./dto";

export class ExpressFollowController {
  async getOneById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const follow = await ServiceContainer.follow.findById.run(req.params.id);

      res.json(follow.mapToPrimitives()).status(200);
    } catch (error) {
      next(error);
    }
  }

  async getUsersFollowYou(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user) {
        throw new Error("User ID is required");
      }

      const followers = await ServiceContainer.follow.findUsersFollowYou.run(
        req.user.id.value
      );

      res.json(followers.map((follow) => follow.mapToPrimitives())).status(200);
    } catch (error) {
      next(error);
    }
  }

  async getUsersYouFollow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user) {
        throw new Error("User ID is required");
      }

      const followers = await ServiceContainer.follow.findUsersYouFollow.run(
        req.user.id.value
      );

      res.json(followers.map((follow) => follow.mapToPrimitives())).status(200);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { idUserToFollow } = req.body as FollowDTO;
      if (!req.user) {
        throw new Error("User ID is required");
      }

      await ServiceContainer.follow.create.run(
        idUserToFollow,
        req.user.id.value
      );

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new Error("User ID is required");
      }
      await ServiceContainer.follow.delete.run(
        req.params.id,
        req.user.id.value
      );

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
