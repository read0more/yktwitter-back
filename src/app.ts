import express, { Request, Response, NextFunction } from "express";

const app = express();
const port = 3000;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello world!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
