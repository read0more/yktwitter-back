import { Router } from "express";
import asyncRouteWrapper from "../library/asyncRouteWrapper";
import * as AuthController from "../controller/AuthController";

const router = Router();

export const ROOT = "/auth";
export const LOGIN = "/login";
export const LOGOUT = "/logout";
export const ME = "/me";

router.get(ME, asyncRouteWrapper(AuthController.me));
router.post(LOGIN, asyncRouteWrapper(AuthController.login));
router.post(LOGOUT, AuthController.logout);

export default router;
