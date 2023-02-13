const express = require("express");
const router = express.Router();

const { getHomeController, loginController, registerController, logoutController } = require("../controllers/usersSession")
const { isAuth,isLogged } = require("../middleware/isAuthSession");

router.get("/", isAuth, getHomeController);
router.post("/register", isLogged, registerController);
router.post("/login", isLogged, loginController);
router.get("/home", isAuth, getHomeController);
router.get("/logout", logoutController);

module.exports = router;
