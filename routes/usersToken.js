const express = require('express');
// const { body, validationResult } = require('express-validator');

const userController = require("../controllers/userToken");
const { isAuth, isLoggedIn } = require('../middleware/isAuth');
const { validateLogin, validateSignUp } = require("../middleware/validation")

const router = express.Router();

router.get('/', isAuth, userController.getHome)

router.get("/login", isLoggedIn, userController.getLogin)

router.post("/login", validateLogin, userController.postLogin)

router.get("/signup", userController.getSignup)

router.post("/signup", validateSignUp, userController.postSignup)

router.get("/home", isAuth, userController.getHome)

router.get("/refresh", userController.getRefresh)

router.get('/logout', userController.getLogout);
module.exports = router;