const joi = require("joi");
const { joiPasswordExtendCore } = require("joi-password");
const joiPassword = joi.extend(joiPasswordExtendCore);

module.exports.userSchemaValidation = (user) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joiPassword
            .string()
            .minOfSpecialCharacters(1)
            .minOfLowercase(1)
            .minOfUppercase(1)
            .minOfNumeric(5)
            .noWhiteSpaces()
            .required()
    })
    return schema.validate(user);
}

