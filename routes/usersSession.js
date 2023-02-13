const express = require("express");

const router = express.Router();

const userController = require("../controllers/usersSession")
const { isAuth } = require("../middleware/isAuthSession");


// router.get("/", isAuth, userController.getHome);
// router.get("/login", userController.getLogin);
// router.post("/login", userController.postLogin);
// router.get("/signup", userController.getSignup);
// router.post("/signup", userController.postSignup);
// router.get("/home", isAuth, userController.getHome);
// router.get("/logout", userController.getLogout);

module.exports = router;