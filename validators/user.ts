import joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
const joiPassword = joi.extend(joiPasswordExtendCore);

export const userSchemaValidation = (user: any) => {
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

