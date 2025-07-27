import { NextFunction, Request, Response } from "express";

export const isAuth = (req: Request, res: Response, next: NextFunction) => { // this middleware to check if user is authenticated or not  
    if (!req.session.isLoggedIn) {
        return res.send("un authenticated");
    }
    next();
}

export const isLogged = (req: Request, res: Response, next: NextFunction) => {
    if (req.session.isLoggedIn) {
        return res.send("already logged In")
    }
    next();
}