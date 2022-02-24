import { createPassword } from "../library/hash";
import { NextFunction, Request, Response } from "express";

export const csrfCheck = (req: Request, res: Response, next: NextFunction) => {
  if (
    req.method === "GET" ||
    req.method === "OPTIONS" ||
    req.method === "HEAD"
  ) {
    return next();
  }

  const csrfHeader = req.get("yktwitter-csrf-token");
  console.log(csrfHeader);

  if (!csrfHeader) {
    console.warn("csrf 토큰이 없다.");
    return res.status(403).json({ message: "Failed CSRF check" });
  }

  validateCSRFToken(csrfHeader).then((valid) => {
    if (!valid) {
      console.warn("csrf 토큰이 없다.");
      return res.status(403).json({ message: "Failed CSRF check" });
    }
    next();
  });
};

async function validateCSRFToken(csrfHeader: string) {
  const csrfToken = createPassword(
    process.env.CSRF_SECRET_KEY as string,
    process.env.PASSWORD_SALT
  );

  return csrfToken === csrfHeader;
}
