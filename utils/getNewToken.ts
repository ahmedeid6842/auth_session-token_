import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/users";

export const createNewToken = async function (refreshToken: string) { // this util function to get a new access token by refresh token 
    try {
        let { userId } = jwt.decode(refreshToken) as JwtPayload;

        let user = await User.findById(userId);
        if (!user) return { error: "invalid user id" };

        const refreshSecret = process.env.REFRESH_JWT_SECRET + user.password;
        jwt.verify(refreshToken, refreshSecret);

        const result = user.createAccessToken()
        return result;
    } catch (err: any) {
        if (err.message === "jwt expired") {
            return { error: "your session has expired try to login again" }
        } else if (err.message == "invalid signature") {
            return { error: err.message };
        }
        throw new Error("something went wrong ")
    }

}