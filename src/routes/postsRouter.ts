import { Router } from "express";
import asyncRouteWrapper from "../library/asyncRouteWrapper";
import * as PostController from "../controller/postController";

const router = Router();
export const ROOT = "/posts";
export const GET = "/";
export const POST = "/";
export const PUT = "/:id";
export const DELETE = "/:id";

router.get(GET, asyncRouteWrapper(PostController.readAll));
router.post(POST, asyncRouteWrapper(PostController.create));
router.put(PUT, asyncRouteWrapper(PostController.update));
router.delete(DELETE, asyncRouteWrapper(PostController.deletePost));

export default router;
