import supertest from "supertest";
import express from "express";
import authRouter, * as authPath from "./routes/authRouter";
import customerRouter, * as customerPath from "./routes/customerRouter";
import postRouter, * as postPath from "./routes/postsRouter";
import extractToken from "./middleware/extractToken";
import { createPassword } from "./library/hash";
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
const tempCustomerName = "temp_name";
const tempCustomerEmail = "test@test.com";
const tempCustomerProfilePictureUrl = "test@test.com";

describe("app", () => {
  let token: any;
  let customerEntityId: any;

  beforeEach(() => {});

  it("create customer", (done) => {
    request
      .post(`${customerPath.ROOT}${customerPath.POST}`)
      .send(
        `id=${tempCustomerId}&password=${tempCustomerPassword}&name=${tempCustomerName}&email=${tempCustomerEmail}&profile_picture_url=${tempCustomerProfilePictureUrl}`
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

  it("read customer", (done) => {
    request
      .get(`${customerPath.ROOT}/${customerEntityId}`)
      .expect((res) => {
        const { _id, _name, _email, _profilePictureURL } = res.body;
        expect(_id).toBe(tempCustomerId);
        expect(_name).toBe(tempCustomerName);
        expect(_email).toBe(tempCustomerEmail);
        expect(_profilePictureURL).toBe(tempCustomerProfilePictureUrl);
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
