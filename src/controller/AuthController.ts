import { Request, Response } from "express";
import { createPassword } from "../library/hash";
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
    res.status(200).send(token);
  } catch (e) {
    res.status(401).send("Login Failed.");
  }
}
