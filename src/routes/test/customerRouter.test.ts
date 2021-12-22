import request from "supertest";
import express from "express";
import customerRouter, * as customerPath from "../customerRouter";

const app = express();

app.use(customerPath.ROOT, customerRouter);

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
