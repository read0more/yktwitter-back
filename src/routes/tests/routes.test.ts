import request from "supertest";
import express from "express";
import authRouter, * as authPath from "../authRouter";
import customerRouter, * as customerPath from "../customerRouter";
import postsRouter, * as postsPath from "../postsRouter";

const app = express();

app.use(authPath.ROOT, authRouter);
app.use(customerPath.ROOT, customerRouter);
app.use(postsPath.ROOT, postsRouter);

describe("auth routes", () => {
  it("responds login", async () => {
    const res = await request(app).post(`${authPath.ROOT}${authPath.LOGIN}`);
    expect(res.statusCode).toBe(200);
  });

  it("responds logout", async () => {
    const res = await request(app).post(`${authPath.ROOT}${authPath.LOGOUT}`);
    expect(res.statusCode).toBe(200);
  });
});

describe("customer routes", () => {
  it("responds me", async () => {
    const res = await request(app).get(
      `${customerPath.ROOT}${customerPath.ME}`
    );
    expect(res.statusCode).toBe(200);
  });

  it("responds get customer by id", async () => {
    const res = await request(app).get(
      `${customerPath.ROOT}${customerPath.GET}`
    );
    expect(res.statusCode).toBe(200);
  });

  it("responds create customer", async () => {
    const res = await request(app).post(
      `${customerPath.ROOT}${customerPath.POST}`
    );
    expect(res.statusCode).toBe(201);
  });
});

describe("posts routes", () => {
  it("responds get posts", async () => {
    const res = await request(app).get(`${postsPath.ROOT}${postsPath.GET}`);
    expect(res.statusCode).toBe(200);
  });

  it("responds create post", async () => {
    const res = await request(app).post(`${postsPath.ROOT}${postsPath.POST}`);
    expect(res.statusCode).toBe(201);
  });

  it("responds change post", async () => {
    const res = await request(app).put(`${postsPath.ROOT}${postsPath.PUT}`);
    expect(res.statusCode).toBe(200);
  });

  it("responds delete post", async () => {
    const res = await request(app).delete(
      `${postsPath.ROOT}${postsPath.DELETE}`
    );
    expect(res.statusCode).toBe(200);
  });
});
