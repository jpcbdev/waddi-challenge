import { Request, Response } from 'express';
import { PostsService } from './posts.services';
import { CreatePostDto, UpdatePostDto } from './dtos';

import { IUser } from '../users/interfaces';
import { ByIdDto } from '../shared/dtos';
import { UsersService } from '../users/users.service';

import { USER_PERMISSION } from '../users/enums';

export class PostsController {

    private readonly postsService = new PostsService();
    private readonly usersService = new UsersService();

    public async getPosts(req: Request, res: Response): Promise<void> {
        try {
            const posts = await this.postsService.getPosts();
            res.status(200).json(posts);
        } catch (error: any) {
            res.status(400).send({ message: error?.message, statusCode: 400 });
        }
    }

    public async createPost(req: Request, res: Response): Promise<void> {
        try {
            await CreatePostDto.validateAsync(req.body);
            const authUser = req['user'] as object as IUser;
            await this.usersService.checkUserPermission(authUser.id, USER_PERMISSION.READ_WRITE);
            const post = await this.postsService.createPost(authUser.id, authUser.username, req.body.title, req.body.content);
            res.status(200).json(post);
        } catch (error: any) {
            res.status(400).send({ message: error?.message, statusCode: 400 });
        }
    }

    public async updatePost(req: Request, res: Response): Promise<void> {
        try {
            await UpdatePostDto.validateAsync(req.body);
            const authUser = req['user'] as Request as IUser;
            await this.usersService.checkUserPermission(authUser.id, USER_PERMISSION.UPDATE);
            const post = await this.postsService.updatePost(authUser.id, req.body.id, req.body.title, req.body.content);
            res.status(200).json(post);
        } catch (error: any) {
            res.status(400).send({ message: error?.message, statusCode: 400 });
        }
    }

    public async deletePost(req: Request, res: Response): Promise<void> {
        try {
            await ByIdDto.validateAsync(req.body);
            const authUser = req['user'] as Request as IUser;
            await this.usersService.checkUserPermission(authUser.id, USER_PERMISSION.READ_WRITE);
            const post = await this.postsService.deletePost(authUser.id, req.body.id);
            res.status(200).json(post);
        } catch (error: any) {
            res.status(400).send({ message: error?.message, statusCode: 400 });
        }
    }

}