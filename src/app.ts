import "./bootstrap";
import http from "http";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter, * as authPath from "./routes/authRouter";
import customerRouter, * as customerPath from "./routes/customerRouter";
import postsRouter, * as postsPath from "./routes/postsRouter";
import extractToken from "./middleware/extractToken";
import { Server } from "socket.io";
import helmet from "helmet";
import { csrfCheck } from "./middleware/csrf";
import rateLimit from "./middleware/rateLimiter";

const app = express();

app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:3001" }));
app.use(extractToken);
app.use(helmet());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(rateLimit);
app.use(csrfCheck);
app.use(authPath.ROOT, authRouter);
app.use(customerPath.ROOT, customerRouter);
app.use(postsPath.ROOT, postsRouter);

app.use((req, res, next) => {
  res.status(404).send("Not available");
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  res.sendStatus(500);
});

const server = http.createServer(app);
const port = 3000;

global.socketIo = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
