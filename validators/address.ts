import joi from "joi";

export const addressSchemaValidation = (address: any) => {
    const schema = joi.object({
        name: joi.object().keys({
            firstName: joi.string().min(3).max(255).required(),
            lastName: joi.string().min(3).max(255).required()
        }),
        contactNumber: joi.string().required(),
        address: joi.object().keys({
            country: joi.string().required(),
            city: joi.string().required(),
            street: joi.string().required(),
            postalCode: joi.number().required(),
        }).required()
    })
    return schema.validate(address);
}

export const updateAddressSchemaValidation = (address: any) => {
    const schema = joi.object({
        name: joi.object().keys({
            firstName: joi.string().min(3).max(255),
            lastName: joi.string().min(3).max(255)
        }),
        contactNumber: joi.string(),
        address: joi.object().keys({
            country: joi.string(),
            city: joi.string(),
            street: joi.string(),
            postalCode: joi.number(),
        })
    })
    return schema.validate(address);
}
