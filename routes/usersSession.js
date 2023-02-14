const express = require("express");
const router = express.Router();

const { getHomeController, loginController, registerController, logoutController } = require("../controllers/usersSession")
const { isAuth,isLogged } = require("../middleware/isAuthSession");

/**
 * @swagger
 * tags:
 *  name: Session Authentication
 *  description: user credentials are based on session
 */

/**
 * @swagger 
 * /session/register:
 *  post:
 *      summary: user sign-up
 *      tags : [Session Authentication]
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
 *                          description: containing user session id
 *          400:
 *              description : the request was invalid check you body
 *                      
 */

/**
 * @swagger 
 * /session/login:
 *  post:
 *      summary: user login
 *      tags : [Session Authentication]
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
 *                      description: containing user session id
 *          400:
 *              description : the request was invalid check you body
 *                      
 */

/**
 * @swagger 
 * /session/home:
 *  get:
 *      summary:  get Home  
 *      tags : [Session Authentication]
 *      responses:
 *          200:
 *              description: if you get there then your are authenticated                      
 */

/**
 * @swagger 
 * /session/logout:
 *  get:
 *      summary: logout the user  
 *      tags : [Session Authentication]
 *      responses:
 *          200:
 *              description: sucessfully logged out
 *          500:
 *              description : something went wrong
 *                      
 */


router.get("/", isAuth, getHomeController);
router.post("/register", isLogged, registerController);
router.post("/login", isLogged, loginController);
router.get("/home", isAuth, getHomeController);
router.get("/logout", logoutController);

module.exports = router;
