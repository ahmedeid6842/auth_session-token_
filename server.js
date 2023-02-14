require("dotenv").config();
require("express-async-errors");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const swaggerUI = require("swagger-ui-express");

const tokenAuthRouter = require("./routes/usersToken");
const sessionAuthRouter = require("./routes/usersSession");
const addressBookRouter = require("./routes/addressBook");
const { isAuth } = require("./middleware/isAuthSession")
const { specs } = require("./config/swaggerConfig")
const errorHandler = require("./middleware/errorHandler");
const log = require("./utils/logger");

const app = express();

app.use(express.json());
app.use(cookieParser());

//DONE: uncaught execption handling
process.on("uncaughtException", (ex) => {
    log.error(ex.message)
    process.exit(1)
});

//DONE: unhandeled promise rejections
process.on("unhandledRejection", (ex) => {
    log.error(ex.message)
    process.exit(1)
});

require("./config/sessionConfig")(app);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
app.use("/token", tokenAuthRouter);
app.use("/session", sessionAuthRouter);
app.use("/addressBook", isAuth, addressBookRouter);
app.use(errorHandler);

const port = process.env.PORT || 3000;
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => app.listen(port, log.info(`server started at port : ${port}`)))
