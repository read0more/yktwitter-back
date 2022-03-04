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

  // Header (for Non-Browser Client)
  // 모바일의 경우는 모바일 클라이언트 측에서 헤더에 넣게 해줘야 한다.
  if (req?.headers?.authorization) {
    const parts = req.headers.authorization.split(" ");

    if (parts.length === 2 && parts[0] === headerKey) {
      token = parts[1];
    }
  }

  // Cookie (for Browser)
  if (!token) {
    token = req.cookies["token"];
  }

  if (token) {
    req.token = token as string;
  }

  next();
}
