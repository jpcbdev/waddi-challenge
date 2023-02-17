import { IReview } from './interfaces';
import { ReviewsModel } from './reviews.model';

export class ReviewsRepository {

    public async getReviews(conditions = {}): Promise<IReview[]> {
        return ReviewsModel.findAll({ where: conditions });
    }

    public async getReview(conditions = {}): Promise<IReview[]> {
        return ReviewsModel.findOne({ where: conditions });
    }

    public async createReview(dto: IReview): Promise<IReview> {
        return ReviewsModel.create(dto as any);
    }

}