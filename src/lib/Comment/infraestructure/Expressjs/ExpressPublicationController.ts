import { NextFunction, Request, Response } from "express";
// import { ServiceContainer } from "../../Shared/infrastructure/ServiceContainer";
// import { UserNotFoundError } from "../domain/UserNotFoundError";
import { ServiceContainer } from "../../../shared/ServiceContainer";
import { CommentDTO, CommentUpdateDTO } from "./dto";

export class ExpressCommentController {
  async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        idPublicationFrom,
        page,
      }: { idPublicationFrom: string; page: string } = req.body;

      const comments = await ServiceContainer.comment.getAll.run(
        idPublicationFrom,
        page
      );

      res
        .json(comments.map((comment) => comment.mapToPrimitives()))
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
      const comment = await ServiceContainer.comment.getOneById.run(
        req.params.id
      );

      res.json(comment.mapToPrimitives()).status(200);
    } catch (error) {
      next(error);
    }
  }

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { content, idPublication } = req.body as CommentDTO;
      if (!req.user) {
        throw new Error("User ID is required");
      }
      await ServiceContainer.comment.create.run(
        req.user.id.value,
        idPublication,
        content
      );

      res.status(201).send();
    } catch (error) {
      next(error);
    }
  }

  async edit(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { content, id, idPublication } = req.body as CommentUpdateDTO;

      if (!req.user) {
        throw new Error("User ID is required");
      }

      await ServiceContainer.comment.edit.run(
        id,
        req.user.id.value,
        idPublication,
        content
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
      await ServiceContainer.comment.delete.run(
        req.params.id,
        req.user.id.value
      );

      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
