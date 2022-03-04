import { Request, Response } from "express";
import { createPassword } from "../library/hash";
import { setToken } from "../library/verifyToken";
import MysqlAuthRepository from "../repository/MysqlAuthRepository";
import AuthService from "../service/AuthService";

const authService = new AuthService(new MysqlAuthRepository());

export async function me(req: Request, res: Response) {
  try {
    const me = await authService.me(req.token);
    res.status(200).send(me);
  } catch (e) {
    res.status(401).send("Get me Failed.");
  }
}

export async function login(req: Request, res: Response) {
  try {
    let { id, password } = req.body;
    password = createPassword(password, process.env.PASSWORD_SALT);
    const token = await authService.login(id, password);
    setToken(res, token);
    res.status(200).send(token);
  } catch (e) {
    res.status(401).send("Login Failed.");
  }
}

export function logout(req: Request, res: Response) {
  res.cookie("token", "");
  res.status(200).json({ message: "User has been logged out" });
}

export async function csrfToken(req: Request, res: Response) {
  const csrfToken = await generateCSRFToken();
  res.status(200).json({ csrfToken });
}

async function generateCSRFToken() {
  return createPassword(
    process.env.CSRF_SECRET_KEY as string,
    process.env.PASSWORD_SALT
  );
}
