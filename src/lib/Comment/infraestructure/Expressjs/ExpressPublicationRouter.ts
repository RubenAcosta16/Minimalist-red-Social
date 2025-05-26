import { Router } from "express";
import { ExpressCommentController } from "./ExpressPublicationController";
import { authMiddleware } from "../../../shared/infraestructure/middleware/authMiddleware/authMiddleware";

const controller = new ExpressCommentController();
const ExpressCommentRouter = Router();

ExpressCommentRouter.get("/", controller.getAll);
ExpressCommentRouter.get("/:id", controller.getOneById);
ExpressCommentRouter.post("/", authMiddleware, controller.create);
ExpressCommentRouter.put("/", authMiddleware, controller.edit);
ExpressCommentRouter.delete("/:id", authMiddleware, controller.delete);

export { ExpressCommentRouter };
