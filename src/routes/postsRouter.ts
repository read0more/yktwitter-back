import { Router } from "express";
import Customer from "../model/customer";
import Post from "../model/post";
import MysqlPostRepository from "../repository/MysqlPostRepository";
import PostService from "../service/postService";

const router = Router();
const postService = new PostService(new MysqlPostRepository());
export const ROOT = "/posts";
export const GET = "/";
export const POST = "/";
export const PUT = "/:id";
export const DELETE = "/:id";

router.get(GET, (req, res) => {
  res.status(200).send("");
});

router.post(POST, (req, res) => {
  const { id, content } = req.body;
  postService.create(new Post(id, content));
  res.status(201).send("");
});

router.put(PUT, (req, res) => {
  res.status(200).send("");
});

router.delete(DELETE, (req, res) => {
  res.status(200).send("");
});

export default router;
