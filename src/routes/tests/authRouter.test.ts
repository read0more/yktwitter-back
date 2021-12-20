import request from "supertest";
import express from "express";
import authRouter, * as authPath from "../authRouter";

const app = express();

app.use(authPath.ROOT, authRouter);

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
