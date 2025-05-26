import { NextFunction, Request, Response } from "express";
// import { ServiceContainer } from "../../Shared/infrastructure/ServiceContainer";
// import { UserNotFoundError } from "../domain/UserNotFoundError";
import { ServiceContainer } from "../../../shared/ServiceContainer";
import { LikeDTO } from "./dto";

export class ExpressLikeController {
  async getOneById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { type } = req.params as LikeDTO;

      const like = await ServiceContainer.like.findById.run(
        req.params.id,
        type
      );

      res.json(like.mapToPrimitives()).status(200);
    } catch (error) {
      next(error);
    }
  }

  async getByPubOrCommId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { idPubOrComm, type } = req.body as LikeDTO;

      const likes = await ServiceContainer.like.findByPubOrCommId.run(
        idPubOrComm,
        type
      );

      res.json(likes.map((like) => like.mapToPrimitives())).status(200);
    } catch (error) {
      next(error);
    }
  }

  async getFindByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!req.user) {
        throw new Error("User ID is required");
      }

      const likes = await ServiceContainer.like.findByUserId.run(
        req.user.id.value,
        req.body.type
      );

      res.json(likes.map((like) => like.mapToPrimitives())).status(200);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { idPubOrComm,type } = req.body as LikeDTO;
      if (!req.user) {
        throw new Error("User ID is required");
      }
      await ServiceContainer.like.create.run( req.user.id.value,idPubOrComm,type );

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
      await ServiceContainer.like.delete.run(req.params.id, req.user.id.value,req.user.id.value);

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
