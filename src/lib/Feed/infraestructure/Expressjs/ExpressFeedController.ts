import { NextFunction, Request, Response } from "express";
// import { ServiceContainer } from "../../Shared/infrastructure/ServiceContainer";
// import { UserNotFoundError } from "../domain/UserNotFoundError";
import { ServiceContainer } from "../../../shared/ServiceContainer";

export class ExpressFeedController {
  async getAllFeed(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const publications = await ServiceContainer.feed.feedFindAll.run();

      res
        .json(publications.map((publication) => publication.mapToPrimitives()))
        .status(200);
    } catch (error) {
      next(error);
    }
  }
}
