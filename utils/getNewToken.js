const jwt = require("jsonwebtoken");
const User = require("../models/users");

const createNewToken = async function (refreshToken) { // this util function to get a new access token by refresh token 
    try {
        let { userId } = jwt.decode(refreshToken);

        let user = await User.findById(userId);
        if (!user) return { error: "invalid user id" };

        const refreshSecret = process.env.RefreshJWTSecret + user.password;
        jwt.verify(refreshToken, refreshSecret);

        const result = user.createAccessToken()
        return result;
    } catch (err) {
        if (err.message === "jwt expired") {
            return { error: "your session has expired try to login again" }
        };
        throw new Error("something went wrong ")
    }

}


module.exports = {
    createNewToken
}