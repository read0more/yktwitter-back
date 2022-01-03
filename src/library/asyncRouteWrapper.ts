// Promise reject에 대한 처리를 하기위해 생성
import { Request, Response, NextFunction } from "express";
type ExpressAsyncRouteHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export default function (
  fn: ExpressAsyncRouteHandler
): ExpressAsyncRouteHandler {
  return (req, res, next) => fn(req, res, next).catch(next);
}
