import { Router } from "express";
import asyncRouteWrapper from "../library/asyncRouteWrapper";
import * as AuthController from "../controller/AuthController";

const router = Router();

export const ROOT = "/auth";
export const LOGIN = "/login";
export const LOGOUT = "/logout";
export const CSRF_TOKEN = "/csrf-token";
export const ME = "/me";

router.get(ME, asyncRouteWrapper(AuthController.me));
router.post(LOGIN, asyncRouteWrapper(AuthController.login));
router.post(LOGOUT, AuthController.logout);
router.get(CSRF_TOKEN, AuthController.csrfToken);

export default router;
