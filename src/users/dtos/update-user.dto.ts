import Joi from 'joi';
import { USER_PERMISSION } from '../enums';

export const UpdateUserDto = Joi.object({
    id: Joi.number()
        .strict()
        .required(),
    name: Joi.string()
        .min(3)
        .max(50)
        .required(),
    password: Joi.string()
        .min(3)
        .max(50)
        .required(),
    permissions: Joi.array()
        .items(Joi.string()
            .valid(USER_PERMISSION.READ_WRITE, USER_PERMISSION.UPDATE)
            .required()),
});