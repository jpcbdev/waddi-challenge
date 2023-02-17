import { Router, Request, Response } from 'express';
import { UsersController } from '../users/users.controller';
import { authGuard, adminGuard } from '../shared/utils';

export function useUsersRouter(router: Router) {
    const usersController = new UsersController();
    router.post('/users/signing', (req: Request, res: Response) => usersController.signing(req, res,));
    router.get('/users/get', authGuard, (req: Request, res: Response) => usersController.getUsers(req, res));
    router.get('/users/get/one', authGuard, (req: Request, res: Response) => usersController.getUser(req, res));
    router.post('/users/create', authGuard, adminGuard, (req: Request, res: Response) => usersController.createUser(req, res));
    router.put('/users/update/one', authGuard, adminGuard, (req: Request, res: Response) => usersController.updateUser(req, res));
    router.delete('/users/delete/one', authGuard, adminGuard, (req: Request, res: Response) => usersController.deleteUser(req, res));
}