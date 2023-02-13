const session = require('express-session');
const RedisStore = require("connect-redis")(session);
const Redis = require("ioredis");

const User = require("../models/users");


module.exports = function (app) {
    /**
     * DONE: set-up session configurations 
     * DONE: use redis for connecting sessions
    */
    
    const redisClient = new Redis();
    const store = new RedisStore({
        client: redisClient
    })

    app.use(session({
        name: "sessionID",
        secret: process.env.SESSION_SECRET,
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

}