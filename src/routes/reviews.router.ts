import { Router, Request, Response } from 'express';
import { ReviewsController } from '../reviews/reviews.controller';

export function useReviewsRouter(router: Router) {
    const reviewsController = new ReviewsController();
    router.post('/reviews/get', (req: Request, res: Response) => reviewsController.getReviews(req, res));
    router.post('/reviews/create', (req: Request, res: Response) => reviewsController.createReview(req, res));
}