import {Request, Response, NextFunction, ErrorRequestHandler } from "express";

//DONE: internal server errors with express-async-erros
import log from "../utils/logger";

export default async (error: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
    log.error(error)
    return res.status(500).send("something went wrong");
}