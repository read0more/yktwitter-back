import supertest from "supertest";
import express from "express";
import authRouter, * as authPath from "./routes/authRouter";
import customerRouter, * as customerPath from "./routes/customerRouter";
import postRouter, * as postPath from "./routes/postsRouter";
import extractToken from "./middleware/extractToken";
import { createPassword } from "./library/hash";
import "./bootstrap";
import verifyToken from "./library/verifyToken";
import Customer from "./model/customer";
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

describe("app", () => {
  let token: any;
  let customerEntityId: any;

  const id = "temp1";
  const password = "temp_password";
  const name = "temp_name";
  const email = "test@test.com";
  const profilePictureUrl = "https://test.com/image.jpg";

  const updatedId = "update_temp1";
  const updatedPassword = "update_temp_password";
  const updatedName = "update_temp_name";
  const updatedEmail = "update_test@test.com";
  const updatedProfilePictureUrl = "https://update_test.com/image.jpg";

  it("create customer", (done) => {
    request
      .post(`${customerPath.ROOT}${customerPath.POST}`)
      .send(
        createCustomerBodyString(
          "temp1",
          "temp_password",
          "temp_name",
          "test@test.com",
          "https://test.com/image.jpg"
        )
      )
      .expect(201, done);
  });

  it("login", (done) => {
    request
      .post(`${authPath.ROOT}${authPath.LOGIN}`)
      .send(`id=${id}&password=${password}`)
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
        expect(_id).toBe(id);
        expect(_name).toBe(name);
        expect(_email).toBe(email);
        expect(_profilePictureURL).toBe(profilePictureUrl);
      })
      .expect(200, done);
  });

  it("update customer", (done) => {
    request
      .put(`${customerPath.ROOT}/${customerEntityId}`)
      .set("Authorization", `Bearer ${token}`)
      .send(
        createCustomerBodyString(
          updatedId,
          updatedPassword,
          updatedName,
          updatedEmail,
          updatedProfilePictureUrl
        )
      )
      .expect((res) => {
        const { _id, _password, _name, _email, _profilePictureURL } = res.body;
        expect(_id).toBe(updatedId);
        expect(_password).toBe(
          createPassword(updatedPassword, process.env.PASSWORD_SALT)
        );
        expect(_name).toBe(updatedName);
        expect(_email).toBe(updatedEmail);
        expect(_profilePictureURL).toBe(updatedProfilePictureUrl);
      })
      .expect(200, done);
  });

  it("re-login for updated customer", (done) => {
    request
      .post(`${authPath.ROOT}${authPath.LOGIN}`)
      .send(`id=${updatedId}&password=${updatedPassword}`)
      .expect((res) => {
        token = res.text;
        customerEntityId = verifyToken(token)["entity_id"];
      })
      .expect(200, done);
  });

  it("get me", (done) => {
    request;
    request
      .get(`${authPath.ROOT}/${authPath.ME}`)
      .set("Authorization", `Bearer ${token}`)
      .expect((res) => {
        const { _id, _password, _name, _email, _profilePictureURL } = res.body;
        expect(_id).toBe(updatedId);
        expect(_password).toBe(
          createPassword(updatedPassword, process.env.PASSWORD_SALT)
        );
        expect(_name).toBe(updatedName);
        expect(_email).toBe(updatedEmail);
        expect(_profilePictureURL).toBe(updatedProfilePictureUrl);
      })
      .expect(200, done);
  });

  it("delete customer", (done) => {
    request
      .delete(`${customerPath.ROOT}/${customerEntityId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(204, done);
  });
});

function createCustomerBodyString(
  id: string,
  password: string,
  name: string,
  email: string,
  profilePictureURL: string
) {
  return `id=${id}&password=${password}&name=${name}&email=${email}&profile_picture_url=${profilePictureURL}`;
}
