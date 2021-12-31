import express, { NextFunction, Request, Response } from "express";
import { TokenInterface } from "../../service/AuthService";
import verifyToken from "../verifyToken";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

describe("tokenValidator", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();
  const salt = process.env.PASSWORD_SALT as string;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
    };
  });

  it("store customer data global if token validate success", () => {
    const customer: TokenInterface = {
      email: "test@test.com",
      id: "yk",
      name: "parkyk",
      profile_picture_url: "https://google.com/yk.jpg",
    };

    const token = jwt.sign(customer, salt, { expiresIn: "1h" });

    mockRequest = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };

    verifyToken(mockRequest as Request, mockResponse as Response, nextFunction);
    delete global.customer?.exp;
    delete global.customer?.iat;
    expect(global.customer).toEqual(customer);
  });
});
