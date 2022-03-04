import { CookieOptions, Response } from "express";
import jwt from "jsonwebtoken";
import { TokenInterface } from "../service/AuthService";

export default function verifyToken(token: string): TokenInterface {
  if (token) {
    const customer = jwt.verify(
      token,
      process.env.PASSWORD_SALT as string
    ) as TokenInterface;
    return customer;
  } else {
    throw Error("bearer token is null.");
  }
}

export function setToken(res: Response, token: string) {
  const options: CookieOptions = {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    // maxAge: ... 밀리세컨드로 언제 만료될지 설정
  };
  res.cookie("token", token, options);
  res.cookie("token_expire", "", { maxAge: 100 * 1000 });
}
