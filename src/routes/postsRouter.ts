import { Router } from "express";
import asyncRouteWrapper from "../library/asyncRouteWrapper";
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

router.get(
  GET,
  asyncRouteWrapper(async (req, res) => {
    try {
      const result = await postService.readAll();
      res.status(200).send(result);
    } catch (e) {
      res.status(500).send("Failed read posts");
    }
  })
);

router.post(
  POST,
  asyncRouteWrapper(async (req, res) => {
    try {
      const { customer_id, content } = req.body;
      const result = await postService.create(new Post(customer_id, content));
      res.status(201).send(result);
    } catch (e) {
      res.status(500).send("Failed create posts");
    }
  })
);

router.put(
  PUT,
  asyncRouteWrapper(async (req, res) => {
    try {
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
    } catch (e) {
      res.status(500).send("Failed update posts");
    }
  })
);

router.delete(
  DELETE,
  asyncRouteWrapper(async (req, res) => {
    try {
      let id = parseInt(req.params.id);
      verifyToken(req.token);

      if (!id || isNaN(id)) {
        throw Error();
      }

      const result = await postService.delete(id);
      res.status(204).send(result);
    } catch (e) {
      res.status(500).send("Failed delete posts");
    }
  })
);

export default router;
