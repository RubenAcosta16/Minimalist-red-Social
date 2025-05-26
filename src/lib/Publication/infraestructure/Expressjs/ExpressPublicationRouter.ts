import { Router } from "express";
import { ExpressPublicationController } from "./ExpressPublicationController";
import { authMiddleware } from "../../../shared/infraestructure/middleware/authMiddleware/authMiddleware";

const controller = new ExpressPublicationController();
const ExpressPublicationRouter = Router();

ExpressPublicationRouter.get("/", controller.getAll);
ExpressPublicationRouter.get("/:id", controller.getOneById);
ExpressPublicationRouter.post("/", authMiddleware, controller.create);
ExpressPublicationRouter.put("/", authMiddleware, controller.edit);
ExpressPublicationRouter.delete("/:id", authMiddleware, controller.delete);

export { ExpressPublicationRouter };
