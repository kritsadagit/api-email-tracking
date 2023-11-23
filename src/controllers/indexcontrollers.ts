import { RequestHandler } from "express";

export const indexController: RequestHandler = (req, res, next) => {
  try {
    res.send("index");
  } catch (error) {
    next(error);
  }
};
