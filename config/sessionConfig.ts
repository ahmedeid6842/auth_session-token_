import session from 'express-session';
import ConnectReddis from "connect-redis";
import Redis from "ioredis";


const RedisStore = ConnectReddis(session);

export default function (app: any) {
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
        secret: process.env.SESSION_SECRET as string,
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