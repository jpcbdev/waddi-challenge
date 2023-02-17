import { IPost } from './interfaces';
import { PostsRepository } from './posts.repository';
import { LogsService } from '../logs/logs.service';

export class PostsService {

    private readonly postsRepository = new PostsRepository();
    private readonly logsService = new LogsService

    public async getPosts(): Promise<IPost[]> {
        const posts = await this.postsRepository.getPosts();
        return posts;
    }

    public async getPost(id: number): Promise<IPost> {
        const posts = await this.postsRepository.getPost({ id });
        return posts;
    }

    public async createPost(userId: number, username: string, title: string, content: string): Promise<IPost> {
        try {
            const post = await this.postsRepository.createPost({ UserId: userId, title, content });
            await this.logsService.createLog(userId, `El usuario ID: ${userId} creó el post ID: ${post.id}`);
            return post;
        } catch (error: any) {
            throw new Error(error?.message);
        }
    }

    public async updatePost(userId: number, id: number, title: string, content: string): Promise<number[]> {
        const post = await this.getPost(id);
        if (!post) throw new Error('Post not found!');
        const query = await this.postsRepository.updatePost(id, { title, content });
        await this.logsService.createLog(userId, `El usuario ID: ${userId} actualizó el post ID: ${post.id}`);
        return query;
    }

    public async deletePost(userId: number, id: number): Promise<number> {
        const post = await this.getPost(id);
        if (!post) throw new Error('Post not found!');
        const query = await this.postsRepository.deletePost(id);
        await this.logsService.createLog(userId, `El usuario ID: ${userId} actualizó el post ID: ${post.id}`);
        return query;
    }

}