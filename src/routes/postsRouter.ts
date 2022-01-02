import { Router } from "express";
import verifyToken from "../library/verifyToken";
import Post from "../model/Post";
import MysqlPostRepository from "../repository/MysqlPostRepository";
import PostService from "../service/postService";

const router = Router();
const postService = new PostService(new MysqlPostRepository());
export const ROOT = "/posts";
export const GET = "/";
export const POST = "/";
export const PUT = "/:id";
export const DELETE = "/:id";

router.get(GET, async (req, res) => {
  const result = await postService.readAll();
  res.status(200).send(result);
});

router.post(POST, async (req, res) => {
  const { customer_id, content } = req.body;
  const result = await postService.create(new Post(customer_id, content));
  res.status(201).send(result);
});

router.put(PUT, async (req, res) => {
  let id = parseInt(req.params.id);

  if (!id || isNaN(id)) {
    throw Error();
  }

  const { content } = req.body;
  const customer = verifyToken(req.token);
  const result = await postService.update(
    new Post(customer.entity_id, content, id)
  );
  res.status(200).send(result);
});

router.delete(DELETE, (req, res) => {
  res.status(200).send("");
});

export default router;
