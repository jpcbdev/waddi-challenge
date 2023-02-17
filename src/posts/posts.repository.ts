import { IPost } from './interfaces';
import { PostsModel } from './posts.model';
import { ReviewsModel } from '../reviews/reviews.model';

export class PostsRepository {

    public async getPosts(): Promise<IPost[]> {
        return PostsModel.findAll({
            include: ReviewsModel
        });
    }

    public async getPost(conditions = {}): Promise<IPost> {
        return PostsModel.findOne({ where: conditions });
    }

    public async createPost(dto: IPost): Promise<IPost> {
        return PostsModel.create(dto as any);
    }

    public async updatePost(id: number, payload: object) {
        return PostsModel.update({ payload }, { where: { id } })
    }

    public async deletePost(id: number) {
        return PostsModel.destroy({ where: { id } })
    }

}