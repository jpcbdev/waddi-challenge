import Joi from 'joi';
import { USER_ROLE, USER_PERMISSION } from '../enums'
export const CreateUserDto = Joi.object({
    name: Joi.string()
        .min(3)
        .max(50)
        .required(),
    username: Joi.string()
        .min(3)
        .max(50)
        .required(),
    password: Joi.string()
        .min(3)
        .max(50)
        .required(),
    role: Joi.string()
        .valid(USER_ROLE.USER)
        .required(),
    permissions: Joi.array()
        .items(Joi.string()
            .valid(USER_PERMISSION.READ_WRITE, USER_PERMISSION.UPDATE)
            .required()),
});