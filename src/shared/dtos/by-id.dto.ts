import Joi from 'joi';

export const ByIdDto = Joi.object({
    id: Joi.number()
        .strict()
        .required(),
});