import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const stringQueryKey = "access_token";
export const headerKey = "Bearer";
export const reqTokenName = "token";
const AUTH_ERROR = "auth error";

type MyResponseLocals = {
  customerId: string;
};

export default function verifyToken(
  req: Request,
  res: Response<any, MyResponseLocals>,
  next: NextFunction
) {
  let token = null;

  if (req.query[stringQueryKey]) {
    token = req.query[stringQueryKey];
  }

  if (req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");

    if (parts.length === 2 && parts[0] === headerKey) {
      token = parts[1];
    }
  }

  if (token) {
    jwt.verify(
      token as string,
      process.env.PASSWORD_SALT as string,
      async (error, decoded) => {
        if (error) {
          return res.status(401).json(AUTH_ERROR);
        }
        // const customer = get customer
        // customer가 없다면 return res.status(401).json(AUTH_ERROR);
        res.locals.customerId = "";
        next();
      }
    );
  } else {
    return res.status(401).json(AUTH_ERROR);
  }
}
