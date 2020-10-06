const JWT = require("jsonwebtoken");
const User = require("../models/users");
require('dotenv').config()


const getRefreshToken = function (id, secret) {
    return JWT.sign({ userId: id }, secret, { expiresIn: 1000 * 60 * 60 * 24 * 3 });

}

const getAccessToken = function (id, secret) {
    return JWT.sign({ userId: id }, secret, { expiresIn: '15s' });
}


const refreshTokens = async function (refreshToken) {
    let userID = -1;
    try {
        let { userId } = JWT.decode(refreshToken);
        userID = userId;
    } catch (err) {
        return {};
    }

    let user = await User.findById(userID);
    if (!user) return {};

    const refreshSecret = process.env.RefreshJWTSecret + user.password; //if user need to change his password the server would validate depending on new-password
    const accessSecret = process.env.AccessJWTSecret + user.password;
    try {
        JWT.verify(refreshToken, refreshSecret);
    } catch (err) {
        return {};
    }
    return {
        accessToken: getAccessToken(user._id, accessSecret),
        refreshToken: getRefreshToken(user._id, refreshSecret),
    }
}

module.exports = {
    getAccessToken,
    getRefreshToken,
    refreshTokens
}