import Joi from 'joi';

export const CreateReviewDto = Joi.object({
    postId: Joi.number()
        .strict()
        .required(),
    stars: Joi.number()
        .strict()
        .min(1)
        .max(5)
        .required(),
    comment: Joi.string()
        .min(1)
        .max(800)
        .optional(),
});
