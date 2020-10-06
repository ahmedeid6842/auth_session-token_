const User = require("../models/users");

const bcrypt = require('bcryptjs');
require('dotenv').config()

const { getAccessToken, getRefreshToken, refreshTokens } = require('../middleware/genTokens');
const { cookie, validationResult } = require("express-validator/check");



module.exports.getLogin = (req, res) => {
    res.render('login', {
        path: "token",
        validation: ""
    });
}

module.exports.postLogin = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.render("signup", {
            validation: errors.array(),
            path: "token"
        });
    }

    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.redirect("/token/login");
    let verified = await bcrypt.compare(password, user.password);
    if (!verified) return res.redirect("/token/login");

    const refreshSecret = process.env.RefreshJWTSecret + user.password;
    const accessSecret = process.env.AccessJWTSecret + user.password;
    res.cookie("refreshjwt", getRefreshToken(user._id, refreshSecret), {
        secure: process.env.NODE_ENV == 'production' ? true : false,
        path: "/refresh",
        httpOnly: true,
        sameSite: 'strict'
    })
    res.cookie("accessjwt", getAccessToken(user._id, accessSecret), {
        secure: process.env.NODE_ENV == 'production' ? true : false,
        path: "/",
        httpOnly: true,
        sameSite: 'strict'
    })
    res.redirect('/token/home');
}

module.exports.postSignup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render("signup", {
            validation: errors.array(),
            path: "token"
        });
    }
    const { email, password } = req.body;
    try {
        let user = new User({
            email,
            password
        })

        let salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();
        const refreshSecret = process.env.RefreshJWTSecret + user.password;
        const accessSecret = process.env.AccessJWTSecret + user.password;
        res.cookie("refreshjwt", getRefreshToken(user._id, refreshSecret), {
            secure: process.env.NODE_ENV == 'production' ? true : false,
            path: "/refresh",
            httpOnly: true,
            sameSite: 'strict'
        })
        res.cookie("accessjwt", getAccessToken(user._id, accessSecret), {
            secure: process.env.NODE_ENV == 'production' ? true : false,
            path: "/",
            httpOnly: true,
            sameSite: 'strict'
        })
            .redirect('/token/home');
    } catch (err) {
        console.log(err);
    }
}

module.exports.getSignup = (req, res) => {
    res.render("signup", {
        path: "token",
        validation: ""
    });
}

module.exports.getHome = (req, res) => {
    res.render("welcome", {
        name: req.user.email.split("@")[0],
        path: "token"
    });
}



module.exports.getLogout = (req, res) => {
    res.clearCookie("accessjwt");
    res.clearCookie('refreshjwt', { path: '/refresh' })
    res.redirect("/token/");
}

module.exports.getRefresh = async (req, res) => {
    let refreshJWT = req.cookies['refreshjwt'], accesstJWT = req.cookies['accessjwt'];
    if (!refreshJWT || !accesstJWT) return res.redirect("/token/login");
    const newTokens = await refreshTokens(refreshJWT);
    if (!newTokens.accessToken || !newTokens.refreshToken) return res.redirect("/token/login");

    res.cookie("refreshjwt", newTokens.refreshToken, {
        secure: process.env.NODE_ENV == 'production' ? true : false,
        path: "/refresh",
        httpOnly: true,
        sameSite: 'strict'
    })
    res.cookie("accessjwt", newTokens.accessToken, {
        secure: process.env.NODE_ENV == 'production' ? true : false,
        path: "/",
        httpOnly: true,
        sameSite: 'strict'
    })
    res.redirect(`/token${req.query.path}`)
}


