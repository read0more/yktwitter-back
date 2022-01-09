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
