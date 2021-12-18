import { Router } from "express";

const router = Router();
export const ROOT = "/customer";
export const ME = "/me";
export const GET = "/:id";
export const POST = "/";

router.get(ME, (req, res) => {
  // todo: 자기 정보 가져오기
  res.status(200).send("");
});

router.get(GET, (req, res) => {
  // todo: :id값의 id 가진 사용자 정보 가져오기
  res.status(200).send("");
});

router.post(POST, (req, res) => {
  // todo: 사용자 create
  res.status(201).send("");
});

export default router;
