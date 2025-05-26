import { NextFunction, Request, Response } from "express";
// import { ServiceContainer } from "../../Shared/infrastructure/ServiceContainer";
// import { UserNotFoundError } from "../domain/UserNotFoundError";
import { ServiceContainer } from "../../../shared/ServiceContainer";
import { PublicationDTO, PublicationUpdateDTO } from "./dto";

export class ExpressPublicationController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const publications = await ServiceContainer.publication.getAll.run();

      res
        .json(publications.map((publication) => publication.mapToPrimitives()))
        .status(200);
    } catch (error) {
      next(error);
    }
  }

  async getOneById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const publication = await ServiceContainer.publication.getOneById.run(
        req.params.id
      );

      res.json(publication.mapToPrimitives()).status(200);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { content, imageFile } = req.body as PublicationDTO;
      if (!req.user) {
        throw new Error("User ID is required");
      }
      await ServiceContainer.publication.create.run(
        req.user.id.value,
        content,
        imageFile
      );

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  }

  async edit(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { content, id, imageFile } = req.body as PublicationUpdateDTO;

      if (!req.user) {
        throw new Error("User ID is required");
      }

      await ServiceContainer.publication.edit.run(
        id,
        req.user.id.value,
        content,
        imageFile
      );

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      if (!req.user) {
        throw new Error("User ID is required");
      }
      await ServiceContainer.publication.delete.run(
        req.params.id,
        req.user.id.value
      );

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
