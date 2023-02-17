import { Request, Response } from 'express';
import { ReviewsService } from './reviews.service';
import { GetReviewsDto, CreateReviewDto } from './dtos';

export class ReviewsController {

    private readonly reviewsService = new ReviewsService();

    public async getReviews(req: Request, res: Response): Promise<void> {
        try {
            await GetReviewsDto.validateAsync(req.body);
            const reviews = await this.reviewsService.getReviews(req.body.postId);
            res.status(200).json(reviews);
        } catch (error: any) {
            res.status(400).send({ message: error?.message, statusCode: 400 });
        }
    }

    public async createReview(req: Request, res: Response): Promise<void> {
        try {
            await CreateReviewDto.validateAsync(req.body);
            const review = await this.reviewsService.createReview(req.body.postId, req.body.stars, req.body.comment);
            res.status(200).json(review);
        } catch (error: any) {
            res.status(400).send({ message: error?.message, statusCode: 400 });
        }
    }


}