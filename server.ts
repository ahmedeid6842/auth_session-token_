import "dotenv/config";
import "express-async-errors";
import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import swaggerUI from "swagger-ui-express";

import SessionConfig from './config/sessionConfig';
import tokenAuthRouter from "./routes/usersToken";
import sessionAuthRouter from "./routes/usersSession";
import addressBookRouter from "./routes/addressBook";
import { isAuth } from "./middleware/isAuthSession";
import { specs } from "./config/swaggerConfig";
import errorHandler from "./middleware/errorHandler";
import log from "./utils/logger";

const app = express();

app.use(express.json());
app.use(cookieParser());

//DONE: uncaught execption handling
process.on("uncaughtException", (ex) => {
    log.error(ex.message)
    process.exit(1)
});

//DONE: unhandeled promise rejections
process.on("unhandledRejection", (ex: any) => {
    log.error(ex.message)
    process.exit(1)
});

SessionConfig(app);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
app.use("/token", tokenAuthRouter);
app.use("/session", sessionAuthRouter);
app.use("/addressBook", isAuth, addressBookRouter);
app.use(errorHandler);

const port = process.env.PORT || 3000;
mongoose
    .connect(process.env.MONGODB_URI as string || "mongodb://localhost:27017/auth")
    .then(() => app.listen(port, ()=> log.info(`server started at port : ${port}`)))
