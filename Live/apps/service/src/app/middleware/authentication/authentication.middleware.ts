import { NextFunction, Request, Response } from "express";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  console.log("b")
  if (!this.httpContext.user.isAuthenticated()) {
    console.log("hallllo");
    res.sendStatus(401);
    return;
  }
  console.log("hallo;")
  next();
}
