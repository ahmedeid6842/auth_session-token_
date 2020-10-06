const jwt = require("jsonwebtoken");
const User = require("../models/users");
require('dotenv').config()

module.exports.isAuth = async (req, res, next) => {
    let accesstJWT = req.cookies['accessjwt']
    if (!accesstJWT) return res.redirect('/token/login');
    try {
        let { userId } = jwt.decode(accesstJWT);
        let user = await User.findById(userId);
        if (!user) return res.redirect("/token/login")
        const accessSecret = process.env.AccessJWTSecret + user.password;
        let decoded = jwt.verify(accesstJWT, accessSecret);
        req.user = user;
        next();
    } catch (err) {
        return res.redirect(`/token/refresh?path=${req.path}`);
    }
}

module.exports.isLoggedIn = async (req, res, next) => {
    let accesstJWT = req.cookies['accessjwt'];
    try {
        let { userId } = jwt.decode(accesstJWT);
        let user = await User.findById(userId);
        if (!user) return res.redirect("/token/signup")
        const accessSecret = process.env.AccessJWTSecret + user.password;
        let decoded = jwt.verify(accesstJWT, accessSecret);
        return res.redirect("/token/home");
    } catch (err) {
        next();
    }
}

