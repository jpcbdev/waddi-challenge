import { Request, Response } from 'express';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dtos';
import { IUser } from './interfaces';

import { UsersService } from './users.service';
import { ByIdDto } from '../shared/dtos';

export class UsersController {

    private usersServices: UsersService = new UsersService();

    public async signing({ body }: Request, res: Response): Promise<void> {
        try {
            await LoginUserDto.validateAsync(body);
            const token = await this.usersServices.signing(body.username, body.password);
            res.status(200).json({ token });
        } catch (error: any) {
            res.status(400).send({ message: error?.message, statusCode: 400 });
        }
    }

    public async getUsers(req: Request, res: Response): Promise<void> {
        const users = await this.usersServices.getUsers();
        res.status(200).json(users);
    }

    public async getUser(req: Request, res: Response): Promise<void> {
        const authUser = req['user'] as Request as IUser;
        const user = await this.usersServices.getUser(authUser.id);
        res.status(200).json(user);
    }

    public async createUser(req: Request, res: Response): Promise<void> {
        try {
            await CreateUserDto.validateAsync(req.body);
            const user = await this.usersServices.createUser(req.body);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).send({ message: error?.message, statusCode: 400 });
        }
    }

    public async updateUser({ body }: Request, res: Response): Promise<void> {
        try {
            await UpdateUserDto.validateAsync(body);
            const { id, ...rest } = body;
            const user = await this.usersServices.updateUser(id, rest);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).send({ message: error?.message, statusCode: 400 });
        }
    }

    public async deleteUser({ body }: Request, res: Response): Promise<void> {
        try {
            await ByIdDto.validateAsync(body);
            const user = await this.usersServices.deleteUser(body.id);
            res.status(200).json(user);
        } catch (error: any) {
            res.status(400).send({ message: error?.message, statusCode: 400 });
        }
    }

}