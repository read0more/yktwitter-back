import { NextFunction, Request, Response } from "express";
import { TokenInterface } from "../../service/AuthService";
import verifyToken from "../verifyToken";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const salt = process.env.PASSWORD_SALT as string;

describe("tokenValidator", () => {
  it("token is null error", () => {
    expect(() => {
      verifyToken("");
    }).toThrowError("bearer token is null.");
  });

  it("store customer data global if token validate success", () => {
    const customer: TokenInterface = {
      entity_id: 1,
      email: "test@test.com",
      id: "yk",
      name: "parkyk",
      profile_picture_url: "https://google.com/yk.jpg",
    };

    const token = jwt.sign(customer, salt, { expiresIn: "1h" });
    const verifiedCustomer = verifyToken(token);
    delete verifiedCustomer?.exp;
    delete verifiedCustomer?.iat;
    expect(verifiedCustomer).toEqual(customer);
  });
});
