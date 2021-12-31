import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { TokenInterface } from "../service/AuthService";

export default function verifyToken(
  req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  res: Response<any, Record<string, any>>,
  next: NextFunction
): void {
  const bearerToken = req.headers["authorization"]?.split(" ")?.[1];

  if (bearerToken) {
    const customer = jwt.verify(
      bearerToken as string,
      process.env.PASSWORD_SALT as string
    ) as TokenInterface;
    global.customer = customer;
  }

  next();
}
