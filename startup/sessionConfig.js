const session = require('express-session');
const MongoDBStore = require("connect-mongodb-session")(session);

const User = require("../models/users");

require("dotenv").config();

const store = new MongoDBStore({
    uri: process.env.mongodbURI,
    collection: "sessions"
})

module.exports = function (app) {
    app.use(session({
        name: "sessionID",
        secret: process.env.SessionSecret,
        resave: false,
        saveUninitialized: false,
        store: store,
        cookie: {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 3,
            secure: process.env.NODE_ENV == 'production' ? true : false
        }
    }))

    app.use(async (req, res, next) => {
        try {
            if (!req.session.user) {
                return next();
            }
            const user = await User.findById(req.session.user._id);
            if (!user) return next();
            req.user = user;
            next();
        } catch (err) {
            next(err);
        }
    })
}