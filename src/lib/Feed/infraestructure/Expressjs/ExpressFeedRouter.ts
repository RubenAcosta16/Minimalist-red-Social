import { Router } from "express";
import { authMiddleware } from "../../../shared/infraestructure/middleware/authMiddleware/authMiddleware";
import { ExpressFeedController } from "./ExpressFeedController";

const controller = new ExpressFeedController();
const ExpressFeedRouter = Router();

ExpressFeedRouter.get("/",authMiddleware, controller.getAllFeed);


export { ExpressFeedRouter };
