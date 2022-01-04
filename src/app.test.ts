import supertest from "supertest";
import express from "express";
import authRouter, * as authPath from "./routes/authRouter";
import customerRouter, * as customerPath from "./routes/customerRouter";
import postRouter, * as postPath from "./routes/postsRouter";
import extractToken from "./middleware/extractToken";
import "./bootstrap";
import verifyToken from "./library/verifyToken";
jest.setTimeout(30000);

const app = express();

app.use(extractToken);
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(authPath.ROOT, authRouter);
app.use(customerPath.ROOT, customerRouter);
app.use(postPath.ROOT, postRouter);

const request = supertest(app);
const tempCustomerId = "temp1";
const tempCustomerPassword = "temp_password";

describe("app", () => {
  let token: any;
  let customerEntityId: any;

  beforeEach(() => {});

  it("create customer", (done) => {
    request
      .post(`${customerPath.ROOT}${customerPath.POST}`)
      .send(
        `id=${tempCustomerId}&password=${tempCustomerPassword}&name=temp_name&email=test@test.com&profile_picture_url=https://image.com/img.jpg`
      )
      .expect(201, done);
  });

  it("login", (done) => {
    request
      .post(`${authPath.ROOT}${authPath.LOGIN}`)
      .send(`id=${tempCustomerId}&password=${tempCustomerPassword}`)
      .expect((res) => {
        token = res.text;
        customerEntityId = verifyToken(token)["entity_id"];
      })
      .expect(200, done);
  });

  it("delete customer", (done) => {
    request
      .delete(`${customerPath.ROOT}/${customerEntityId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(`id=${tempCustomerId}&password=${tempCustomerPassword}`)
      .expect(204, done);
  });
});
