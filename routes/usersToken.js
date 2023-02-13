const express = require('express');

const { getHomeController, loginController, logoutController, registerController, getRefreshTokenController } = require("../controllers/userToken");
const { isAuth, isLoggedIn } = require('../middleware/isAuthToken');

const router = express.Router();

router.get('/', isAuth, getHomeController)
router.post("/login", isLoggedIn, loginController)
router.post("/register", isLoggedIn, registerController)
router.get("/home", isAuth, getHomeController)
router.get("/refresh", getRefreshTokenController)
router.get('/logout', logoutController);

module.exports = router;