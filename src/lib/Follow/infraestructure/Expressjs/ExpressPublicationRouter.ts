import { Router } from "express";
import { authMiddleware } from "../../../shared/infraestructure/middleware/authMiddleware/authMiddleware";
import { ExpressFollowController } from "./ExpressPublicationController";

const controller = new ExpressFollowController();
const ExpressFollowRouter = Router();

ExpressFollowRouter.get("/:id", authMiddleware, controller.getOneById);
ExpressFollowRouter.get(
  "/youfollow/:id",
  authMiddleware,
  controller.getUsersYouFollow
);
ExpressFollowRouter.get(
  "/followyou/:id",
  authMiddleware,
  controller.getUsersFollowYou
);
ExpressFollowRouter.post("/", authMiddleware, authMiddleware, controller.create);
ExpressFollowRouter.delete(
  "/:id",
  authMiddleware,
  authMiddleware,
  controller.delete
);

export { ExpressFollowRouter };
