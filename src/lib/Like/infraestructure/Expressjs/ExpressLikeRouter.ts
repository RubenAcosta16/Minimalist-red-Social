import { Router } from "express";
import { authMiddleware } from "../../../shared/infraestructure/middleware/authMiddleware/authMiddleware";
import { ExpressFollowController } from "../../../Follow/infraestructure/Expressjs/ExpressPublicationController";


const controller = new ExpressFollowController();
const ExpressLikeRouter = Router();

ExpressLikeRouter.get("/:id", authMiddleware, controller.getOneById);
ExpressLikeRouter.get(
  "/youfollow/:id",
  authMiddleware,
  controller.getUsersYouFollow
);
ExpressLikeRouter.get(
  "/followyou/:id",
  authMiddleware,
  controller.getUsersFollowYou
);
ExpressLikeRouter.post("/", authMiddleware, authMiddleware, controller.create);
ExpressLikeRouter.delete(
  "/:id",
  authMiddleware,
  authMiddleware,
  controller.delete
);

export { ExpressLikeRouter };
