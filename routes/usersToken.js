const express = require('express');

const { getHomeController, loginController, logoutController, registerController, getRefreshTokenController } = require("../controllers/userToken");
const { isAuth, isLoggedIn } = require('../middleware/isAuthToken');

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Token Authentication
 *  description: user credentials are based on json web tokens
 */

/**
 * @swagger 
 * /token/register:
 *  post:
 *      summary: user sign-up
 *      tags : [Token Authentication]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          email:
 *                              type: string
 *                              description : the user's email 
 *                          password:
 *                              type: string
 *                              description : the user's password contain[1 upper case , 1 lower case , 5 numberic , 1 special]
 *      responses:
 *          200:
 *              description: sucessfully signed up
 *              headers:
 *                  Set-Cookie:
 *                      schema:
 *                          type: string
 *                          description: containing access token and refresh token for authentication
 *          400:
 *              description : the request was invalid check you body
 *                      
 */

/**
 * @swagger 
 * /token/login:
 *  post:
 *      summary: user login
 *      tags : [Token Authentication]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                          email:
 *                              type: string
 *                              description : the user's email 
 *                          password:
 *                              type: string
 *                              description : the user's password 
 *      responses:
 *          200:
 *              description: sucessfully loged in
 *              headers:
 *                  Set-Cookie:
 *                      schema:
 *                          type: string
 *                      description: containing access token and refresh token for authentication
 *          400:
 *              description : the request was invalid check you body
 *                      
 */

/**
 * @swagger 
 * /token/home:
 *  get:
 *      summary:  get Home  
 *      tags : [Token Authentication]
 *      responses:
 *          200:
 *              description: if you get there then your are authenticated                      
 */

/**
 * @swagger 
 * /token/logout:
 *  get:
 *      summary: logout the user  
 *      tags : [Token Authentication]
 *      responses:
 *          200:
 *              description: sucessfully logged out
 *          500:
 *              description : something went wrong
 *                      
 */

router.get('/', isAuth, getHomeController)
router.post("/login", isLoggedIn, loginController)
router.post("/register", isLoggedIn, registerController)
router.get("/home", isAuth, getHomeController)
router.get("/refresh", getRefreshTokenController)
router.get('/logout', logoutController);

module.exports = router;