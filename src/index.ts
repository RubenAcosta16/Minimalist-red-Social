import express, { Request, Response, NextFunction } from "express";

// import errorMiddleware from "./shared/middleware/errorMiddleware";
// import corsMiddleware from "./shared/middleware/corsMiddleware";
// import sessionMiddleware from "./lib/shared/infraestructure/middleware/";

import cookieParser from "cookie-parser";
// import { ExpressUserRouter } from "./lib/User/infrastructure/Expressjs/ExpressUserRouter";
import { ExpressAuthRouter } from "./lib/Auth/infraestructure/Expressjs/ExpressAuthRouter";
import { errorMiddleware } from "./lib/shared/infraestructure/middleware/errorMiddleware";
import { PORT } from "./lib/shared/infraestructure/config";
import { ExpressCommentRouter } from "./lib/Comment/infraestructure/Expressjs/ExpressPublicationRouter";
import { ExpressFollowRouter } from "./lib/Follow/infraestructure/Expressjs/ExpressPublicationRouter";
import { ExpressLikeRouter } from "./lib/Like/infraestructure/Expressjs/ExpressLikeRouter";
import { ExpressPublicationRouter } from "./lib/Publication/infraestructure/Expressjs/ExpressPublicationRouter";
import { ExpressUserRouter } from "./lib/User/infrastructure/db/Expressjs/ExpressUserRouter";
import { ExpressFeedRouter } from "./lib/Feed/infraestructure/Expressjs/ExpressFeedRouter";

const app = express();

app.use(express.json());
app.use(cookieParser());

// app.use(corsMiddleware);

declare module "express" {
  interface Request {
    session?: { user: null | { id: string; username: string } };
  }
}

// app.use(sessionMiddleware);

app.use("/api/v1/user", ExpressUserRouter);
app.use("/api/v1/auth", ExpressAuthRouter);
app.use("/api/v1/comment", ExpressCommentRouter);
app.use("/api/v1/follow", ExpressFollowRouter);
app.use("/api/v1/like", ExpressLikeRouter);
app.use("/api/v1/publication", ExpressPublicationRouter);
app.use("/api/v1/feed", ExpressFeedRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorMiddleware(err, req, res, next);
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default app;
