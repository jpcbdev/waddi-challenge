import { Router, Request, Response } from 'express';
import { PostsController } from '../posts/posts.controller';
import { authGuard } from '../shared/utils';

export function usePostsRouter(router: Router) {
    const postsController = new PostsController();
    router.get('/posts/get', (req: Request, res: Response) => postsController.getPosts(req, res));
    router.post('/posts/create', authGuard, (req: Request, res: Response) => postsController.createPost(req, res));
    router.put('/posts/update/one', authGuard, (req: Request, res: Response) => postsController.updatePost(req, res));
    router.delete('/posts/delete/one', authGuard, (req: Request, res: Response) => postsController.deletePost(req, res));
}