import jwt, { JwtPayload } from "jsonwebtoken";
import {Request, Response, NextFunction} from 'express';
import User from "../models/users";


export const isAuth = async (req: Request, res: Response, next: NextFunction) => { // this middleware to ensure that incoming request from authenticated user
    /**
     * DONE: check if access token is provided or not
     * DONE: check if userId in jwt matching any user
     * DONE: verify the token
     * DONE: check if access token is expired , redirect to get a new access token 
     */
    let accesstJWT = req.cookies['accessjwt']
    if (!accesstJWT) return res.send('no token provided');
    try {
        const { userId } = jwt.decode(accesstJWT) as JwtPayload;

        let user = await User.findById(userId);
        if (!user) return res.send("invalid token provided")

        const accessSecret = process.env.ACCESS_JWT_SECRET + user.password;
        jwt.verify(accesstJWT, accessSecret);

        req.user = user;
        next();
    } catch (err: any) {
        if (err.message === "jwt expired") {
            return res.redirect(`/token/refresh?path=${req.path}`);
        } else if (err.message == "invalid signature") {
            return res.status(400).send(err.message);
        }
        return res.status(500).send("something went wrong")
    }
}


export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => { // this middleware to ensure user will n't logged in if he already does
    let accesstJWT = req.cookies['accessjwt'];
    try {
        let decoded = jwt.decode(accesstJWT) as JwtPayload;
        if (!decoded) return next();

        let user = await User.findById(decoded.userId);
        if (!user) return res.send("invalid token provided");

        const accessSecret = process.env.ACCESS_JWT_SECRET + user.password;
        jwt.verify(accesstJWT, accessSecret);
        return res.status(400).send("already logged in")
    } catch (err: any) {
        if (err.message === "jwt expired") {
            return next();
        } else if (err.message == "invalid signature") {
            return res.status(400).send(err.message);
        }
    }
}

