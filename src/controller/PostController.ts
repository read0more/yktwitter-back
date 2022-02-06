import { Request, Response } from "express";
import verifyToken from "../library/verifyToken";
import Post from "../model/Post";
import MysqlPostRepository from "../repository/MysqlPostRepository";
import PostService from "../service/postService";

const postService = new PostService(new MysqlPostRepository());

export async function create(req: Request, res: Response) {
  try {
    const { content } = req.body;
    const customer = verifyToken(req.token);
    const result = await postService.create(
      new Post(customer.entity_id, content)
    );
    global.socketIo.emit("changed_post", result);
    res.status(201).send(result);
  } catch (e) {
    res.status(500).send("Failed create posts");
  }
}

export async function readAll(req: Request, res: Response) {
  try {
    const result = await postService.readAll();
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send("Failed read posts");
  }
}

export async function update(req: Request, res: Response) {
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

    global.socketIo.emit("changed_post", result);
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send("Failed update posts");
  }
}

export async function deletePost(req: Request, res: Response) {
  try {
    let id = parseInt(req.params.id);
    verifyToken(req.token);

    if (!id || isNaN(id)) {
      throw Error();
    }

    const result = await postService.delete(id);

    global.socketIo.emit("changed_post", result);
    res.status(204).send(result);
  } catch (e) {
    res.status(500).send("Failed delete posts");
  }
}
