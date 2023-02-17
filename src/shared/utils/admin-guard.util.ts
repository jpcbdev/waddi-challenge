import { Request, Response, NextFunction } from 'express';
import { IUser } from '../../users/interfaces';

import { USER_ROLE } from '../../users/enums';

export function adminGuard(req: Request, res: Response, next: NextFunction) {

    try {
        const authUser = req['user'] as Request as IUser;
        if (!authUser) throw new Error('Unauthorized');
        if (authUser?.role !== USER_ROLE.ADMIN) throw new Error('You dont have admin permissions');
        next();
    } catch (error: any) {
        res.status(401).json({ message: error?.message });
    }

}