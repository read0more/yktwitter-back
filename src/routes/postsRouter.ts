import { Router } from "express";

const router = Router();
export const ROOT = "/posts";
export const GET = "/";
export const POST = "/";
export const PUT = "/:id";
export const DELETE = "/:id";

router.get(GET, (req, res) => {
  res.status(200).send("");
});

router.post(POST, (req, res) => {
  res.status(201).send("");
});

router.put(PUT, (req, res) => {
  res.status(200).send("");
});

router.delete(DELETE, (req, res) => {
  res.status(200).send("");
});

export default router;
