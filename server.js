require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const swaggerUI = require("swagger-ui-express");

const tokenAuthRouter = require("./routes/usersToken");
const sessionAuthRouter = require("./routes/usersSession");
const addressBookRouter = require("./routes/addressBook");
const { isAuth } = require("./middleware/isAuthSession")
const { specs } = require("./config/swaggerConfig")

const app = express();

app.use(express.json());
app.use(cookieParser());

require("./config/sessionConfig")(app);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
app.use("/token", tokenAuthRouter);
app.use("/session", sessionAuthRouter);
app.use("/addressBook", isAuth, addressBookRouter);

const port = process.env.PORT || 4000;
mongoose
    .connect(process.env.MONGODB_URI,
        {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    .then(() => app.listen(port, console.log(`listeing on port ${port}`)))
    .catch(err => console.log(err));

