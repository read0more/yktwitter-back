import request from "supertest";
import express from "express";
import postsRouter, * as postsPath from "../postsRouter";

const app = express();

app.use(postsPath.ROOT, postsRouter);

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
