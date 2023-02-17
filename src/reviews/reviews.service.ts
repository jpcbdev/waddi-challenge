import { IReview } from './interfaces';
import { ReviewsRepository } from './reviews.repository';
import { PostsService } from '../posts/posts.services';

export class ReviewsService {

    private readonly reviewsRepository = new ReviewsRepository();
    private readonly postsService = new PostsService();

    public async getReviews(postId: number): Promise<IReview[]> {
        const reviews = await this.reviewsRepository.getReviews({ PostId: postId });
        return reviews;
    }

    public async createReview(postId: number, stars: number, comment = ''): Promise<IReview> {
        try {
            const post = await this.postsService.getPost(postId)
            if (!post) throw new Error('Post not found!');
            const review = await this.reviewsRepository.createReview({ PostId: postId, stars, comment });
            return review;
        } catch (error: any) {
            console.log(error)
            throw new Error(error?.message);
        }
    }

}