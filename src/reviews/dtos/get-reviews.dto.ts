import Joi from 'joi';

export const GetReviewsDto = Joi.object({
    postId: Joi.number()
        .strict()
        .required(),
});
