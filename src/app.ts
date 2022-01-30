import "./bootstrap";
import express from "express";
import cors from "cors";
import authRouter, * as authPath from "./routes/authRouter";
import customerRouter, * as customerPath from "./routes/customerRouter";
import postsRouter, * as postsPath from "./routes/postsRouter";
import extractToken from "./middleware/extractToken";

const app = express();
const port = 3000;

app.use(cors({ credentials: true }));
app.use(extractToken);
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(authPath.ROOT, authRouter);
app.use(customerPath.ROOT, customerRouter);
app.use(postsPath.ROOT, postsRouter);

app.use((req, res, next) => {
  res.status(404).send("Not available");
});

app.use((error: any, req: any, res: any, next: any) => {
  res.status(500).send("Something wrong");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
