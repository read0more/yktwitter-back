import { Router } from "express";
import { createPassword } from "../library/hash";
import MysqlAuthRepository from "../repository/MysqlAuthRepository";
import AuthService from "../service/AuthService";

const router = Router();
const authService = new AuthService(new MysqlAuthRepository());

export const ROOT = "/auth";
export const LOGIN = "/login";
export const ME = "/me";

router.get(ME, (req, res, next) => {
  const me = authService.me(req.token);
  res.status(200).send(me);
});

router.post(LOGIN, async (req, res) => {
  let { id, password } = req.body;
  try {
    password = createPassword(password, process.env.PASSWORD_SALT);
    const token = await authService.login(id, password);
    res.status(200).send(token);
  } catch (e) {
    res.status(401).send("Login Failed.");
  }
});

export default router;
