const swaggerJsDoc = require("swagger-jsdoc");

const option = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "LOCK REST APIs",
            version: "1.0.0",
            description: "A simple authentication REST API with Address Book"
        }
    },
    servers: [
        {
            url: process.env.SERVER_URL
        }
    ],
    apis: ["./routes/*.js"]
}

module.exports.specs = swaggerJsDoc(option);