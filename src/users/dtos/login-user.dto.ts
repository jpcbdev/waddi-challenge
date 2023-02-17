import Joi from 'joi';

export const LoginUserDto = Joi.object({
    username: Joi.string()
        .min(3)
        .max(50)
        .required(),
    password: Joi.string()
        .min(3)
        .max(50)
        .required()
});
