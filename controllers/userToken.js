const bcrypt = require('bcrypt');
const User = require("../models/users");
const { userSchemaValidation } = require("../validators/user")
const { createNewToken } = require('../utils/getNewToken');

module.exports.loginController = async (req, res) => {
    /**
     * DONE: check if user already logged in or not
     * DONE: validate request body to match login schema
     * DONE: check if user email already exist or not
     * DONE: compare the passwords and verify them
     * DONE: if everything is ok send in cookie accessToken and refresh Token 
     */
    const { error } = userSchemaValidation(req.body);
    if (error) return res.status(400).send(error.message);

    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.status(400).send("invalid email or password");

    let verified = await bcrypt.compare(password, user.password);
    if (!verified) return res.status(400).send("invalid email or password");

    res.cookie("refreshjwt", user.createRefreshToken(), {
        secure: process.env.NODE_ENV == 'production' ? true : false,
        path: "/token/refresh",
        httpOnly: true,
        sameSite: 'strict'
    })

    res.cookie("accessjwt", user.createAccessToken(), {
        secure: process.env.NODE_ENV == 'production' ? true : false,
        path: "/",
        httpOnly: true,
        sameSite: 'strict'
    })

    return res.send(`login successfully ${user.email}`)
}

module.exports.registerController = async (req, res) => {
    /**
     * DONE: validate if user already logged in
     * DONE: validate request body to match user schema
     * DONE: check if email is duplicate and someone else use it
     * DONE: hash user password
     * DONE: create a new user 
     */
    const { error } = userSchemaValidation(req.body);
    if (error) return res.status(400).send(error.message);

    let { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).send(`${email} already assigned to user`);

    let salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    user = await User.create({ email, password });

    res.cookie("refreshjwt", user.createRefreshToken(), {
        secure: process.env.NODE_ENV == 'production' ? true : false,
        path: "/token/refresh",
        httpOnly: true,
        sameSite: 'strict'
    })
    res.cookie("accessjwt", user.createAccessToken(), {
        secure: process.env.NODE_ENV == 'production' ? true : false,
        path: "/",
        httpOnly: true,
        sameSite: 'strict'
    })
    return res.send(`register successfully ${user.email}`)
}

module.exports.getHomeController = (req, res) => {
    /**
     * DONE: must be authenticated to reach this endpoint
     */
    return res.send(`welcome ${req.user.email.split("@")[0]}`)
}

module.exports.logoutController = (req, res) => {
    /**
     * DONE: delete access and refresh token which saved in cookie
     */
    res.clearCookie("accessjwt");
    res.clearCookie('refreshjwt', { path: '/token/refresh' })
    res.send("logout seccessfully");
}

module.exports.getRefreshTokenController = async (req, res) => {
    /**
     * DONE: check if both access and refresh token are exists
     * DONE: call createNewToken function which make ensure if those tokens are allowed to have a new access token
     * DONE: if every thing is ok, then return new access and overwrite the exipred 
     */
    try {
        let refreshJWT = req.cookies['refreshjwt'], accesstJWT = req.cookies['accessjwt'];

        if (!refreshJWT || !accesstJWT) return res.send("no token provided");

        const result = await createNewToken(refreshJWT);
        if (result.error) return res.send(result.error);


        res.cookie("accessjwt", result, {
            secure: process.env.NODE_ENV == 'production' ? true : false,
            path: "/",
            httpOnly: true,
            sameSite: 'strict'
        }).redirect(`/token${req.query.path}`)
    } catch (err) {
        return res.status(500).send("something went wrong")
    }
}


