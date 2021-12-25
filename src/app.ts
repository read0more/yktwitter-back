import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, NextFunction } from "express";
import authRouter, * as authPath from "./routes/authRouter";
import customerRouter, * as customerPath from "./routes/customerRouter";
import postsRouter, * as postsPath from "./routes/postsRouter";

const app = express();
const port = 3000;

app.use(authPath.ROOT, authRouter);
app.use(customerPath.ROOT, customerRouter);
app.use(postsPath.ROOT, postsRouter);

app.use((req, res, next) => {
  res.status(404).send("Not available");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
