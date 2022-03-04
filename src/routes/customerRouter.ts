import { Router } from "express";
import asyncRouteWrapper from "../library/asyncRouteWrapper";
import * as CustomerController from "../controller/CustomerController";

const router = Router();

export const ROOT = "/customer";
export const GET = "/:id";
export const POST = "/";
export const PUT = "/:id";
export const DELETE = "/:id";

router.get(GET, asyncRouteWrapper(CustomerController.get));
router.post(POST, asyncRouteWrapper(CustomerController.create));
router.put(PUT, asyncRouteWrapper(CustomerController.put));
router.delete(DELETE, asyncRouteWrapper(CustomerController.deleteCustomer));

export default router;
