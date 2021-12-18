import { Router } from "express";

const router = Router();
export const ROOT = "/auth";
export const LOGIN = "/login";
export const LOGOUT = "/logout";

router.post(LOGIN, (req, res) => {
  // todo: 로그인
  res.status(200).send("");
});

router.post(LOGOUT, (req, res) => {
  // todo: 로그아웃
  res.status(200).send("");
});

export default router;
