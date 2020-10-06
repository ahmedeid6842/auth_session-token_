const { body, validationResult } = require('express-validator');
const User = require("../models/users");

module.exports.validateLogin = [
    body('email')
        .isEmail().withMessage("this is invalid email")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 8, max: 16 }).withMessage("8~16 charcter long")
        .escape()
]

module.exports.validateSignUp = [
    body('email')
        .isEmail().withMessage("this is invalid email")
        .normalizeEmail()
        .custom(email => {
            return User.findOne({ email }).then(user => {
                if (user) {
                    return Promise.reject('email is already in used');
                }
            })
        }),
    body('password')
        .isLength({ min: 8, max: 16 }).withMessage("8~16 characters long")
        .matches(/\d/).withMessage('must contain a number')
        .escape()

]