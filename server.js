require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");



const tokenAuthRouter = require("./routes/usersToken");
const sessionAuthRouter = require("./routes/usersSession");

const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))


app.use(cookieParser());

require("./startup/sessionConfig")(app);

app.use("/token", tokenAuthRouter);
// app.use("/session", sessionAuthRouter);

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.mongodbURI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => app.listen(PORT, console.log(`listeing on port ${PORT}`)))
    .catch(err => console.log(err));

