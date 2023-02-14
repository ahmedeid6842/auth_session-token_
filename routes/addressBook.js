const express = require("express");
const router = express.Router();

const { getAddressController, addAddressController, updateAddressController, deleteAddressController } = require("../controllers/addressBook")

/**
 * @swagger
 * components:
 *  schemas:
 *      Address_Book:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *                  description : the auto generated addressBook id
 *              name:
 *                  type: object
 *                  properties:
 *                      firstName:
 *                          type: string
 *                          description : user first Name
 *                      lastName:
 *                          type: string
 *                          description : user last Name
 *                  description : user full name (firstName + lastName)
 *              contactNumber: 
 *                  type: string
 *                  description: user contact number
 *              address:
 *                  type: object
 *                  properties:
 *                      country :  
 *                          type: string
 *                          description : user country
 *                      city :
 *                          type: string
 *                          description : user city
 *                      street :
 *                          type: string
 *                          description : user street
 *                      postalCode:
 *                          type: integer
 *                          description : user address postal code
 *                  description: the user detailed contact-info
 */

/**
 * @swagger
 * tags:
 *  name: Address Book
 *  description: this is Address Book APIs, **required to be session based authenticated to access this API**
 */

/**
 * @swagger 
 * /addressBook/:
 *  get:
 *      summary: return a contact info of current logged in user
 *      tags : [Address Book]
 *      responses:
 *          200:
 *              description: user contact-info
 *              content:
 *                  application/json : 
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#components/schemas/Address_Book'
 *          404:
 *              description: the contact-info not found
 *          
 *                      
 */

/**
 * @swagger 
 * /addressBook/:
 *  post:
 *      summary: add contact-info for loggedin user's in address book  
 *      tags : [Address Book]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                        name:
 *                          type: object
 *                          properties:
 *                              firstName:
 *                                  type: string
 *                                  description : user first Name
 *                              lastName:
 *                                  type: string
 *                                  description : user last Name
 *                          description : user full name (firstName + lastName)
 *                        contactNumber: 
 *                          type: string
 *                          description: user contact number
 *                        address:
 *                          type: object
 *                          properties:
 *                            country :  
 *                              type: string
 *                              description : user country
 *                            city :
 *                              type: string
 *                              description : user city
 *                            street :
 *                              type: string
 *                              description : user street
 *                            postalCode:
 *                              type: integer
 *                              description : user address postal code
 *                          description: the user detailed contact-info
 *      responses:
 *          200:
 *              description: user contact-info
 *              content:
 *                  application/json : 
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#components/schemas/Address_Book'
 *          400:
 *              description: user has already contact-info 
*/

/**
 * @swagger 
 * /addressBook/:
 *  put:
 *      summary: update loggedin user's contact info in address book 
 *      tags : [Address Book]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      properties:
 *                        name:
 *                          type: object
 *                          properties:
 *                              firstName:
 *                                  type: string
 *                                  description : user first Name
 *                              lastName:
 *                                  type: string
 *                                  description : user last Name
 *                          description : user full name (firstName + lastName)
 *                        contactNumber: 
 *                          type: string
 *                          description: user contact number
 *                        address:
 *                          type: object
 *                          properties:
 *                            country :  
 *                              type: string
 *                              description : user country
 *                            city :
 *                              type: string
 *                              description : user city
 *                            street :
 *                              type: string
 *                              description : user street
 *                            postalCode:
 *                              type: integer
 *                              description : user address postal code
 *                          description: the user detailed contact-info
 *      responses:
 *          200:
 *              description: user contact-info
 *              content:
 *                  application/json : 
 *                      schema:
 *                          type: object
 *                          items:
 *                              $ref: '#components/schemas/Address_Book'
 *          400:
 *              description: invalid request body 
 *          404:
 *              description: no contact-info found to update it
*/

/**
 * @swagger 
 * /addressBook/:
 *  delete:
 *      summary: delete loggedin user's contact-info in address book 
 *      tags : [Address Book]
 *      responses:
 *          200:
 *              description: the contact-info you update
 *          404:
 *              description : the contact-info wasn't found 
 */

router.get("/", getAddressController);
router.post("/", addAddressController);
router.put("/", updateAddressController);
router.delete("/", deleteAddressController);


module.exports = router;