import { jwtVerify } from './jwt.util';
import { Request, Response, NextFunction } from 'express';

export function authGuard(req: Request, res: Response, next: NextFunction) {

    try {
        const authorization = req.headers.authorization?.split('Bearer')[1]?.trim() ?? '';
        if (!authorization) throw new Error('Unauthorized');
        const user = jwtVerify(authorization);
        if (!user) throw new Error('Unauthorized');
        req['user'] = user;
        next();
    } catch (error: any) {
        res.status(401).json({ message: error?.message });
    }

}