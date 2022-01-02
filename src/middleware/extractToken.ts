import { NextFunction, Request, Response } from "express";

export const stringQueryKey = "access_token";
export const headerKey = "Bearer";
export const reqTokenName = "token";

declare global {
  namespace Express {
    interface Request {
      [reqTokenName]: string;
    }
  }
}

export default function (req: Request, res: Response, next: NextFunction) {
  let token = null;

  if (req?.query?.[stringQueryKey]) {
    token = req.query[stringQueryKey];
  }

  if (req?.headers?.authorization) {
    const parts = req.headers.authorization.split(" ");

    if (parts.length === 2 && parts[0] === headerKey) {
      token = parts[1];
    }
  }

  if (token) {
    req.token = token as string;
  }

  next();
}
