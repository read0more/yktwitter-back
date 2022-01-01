import jwt from "jsonwebtoken";
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
