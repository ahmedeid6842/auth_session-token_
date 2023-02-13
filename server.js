require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");



const tokenAuthRouter = require("./routes/usersToken");
const sessionAuthRouter = require("./routes/usersSession");

const app = express();


app.use(express.json());


app.use(cookieParser());

require("./config/sessionConfig")(app);

app.use("/token", tokenAuthRouter);
app.use("/session", sessionAuthRouter);

const port = process.env.PORT || 4000;
mongoose.connect(process.env.MONGODB_URI,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => app.listen(port, console.log(`listeing on port ${port}`)))
    // .catch(err => console.log(err));

