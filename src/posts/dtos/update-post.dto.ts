import Joi from 'joi';

export const UpdatePostDto = Joi.object({
    id: Joi.number()
        .strict()
        .required(),
    title: Joi.string()
        .min(1)
        .max(100)
        .required(),
    content: Joi.string()
        .min(1)
        .max(800)
        .required(),
});
