import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { TokenInterface } from "../service/AuthService";

export default function verifyToken(token: string): void {
  if (token) {
    const customer = jwt.verify(
      token,
      process.env.PASSWORD_SALT as string
    ) as TokenInterface;
    global.customer = customer;
  } else {
    throw Error("bearer token is null.");
  }
}
