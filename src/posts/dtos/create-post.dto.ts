import Joi from 'joi';

export const CreatePostDto = Joi.object({
    title: Joi.string()
        .min(1)
        .max(100)
        .required(),
    content: Joi.string()
        .min(1)
        .max(800)
        .required(),
});
