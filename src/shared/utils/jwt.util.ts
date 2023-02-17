import jwt from 'jsonwebtoken';
import { IUser } from '../../users/interfaces';
import { JWT_SECRET } from '../constants/global.constants';

export function jwtSignIn(payload: object): string {
    return jwt.sign(payload, `${JWT_SECRET}`, { algorithm: 'HS256', expiresIn: '2d' });
}

export function jwtVerify(token: string): IUser {
    try {
        return jwt.verify(token, `${JWT_SECRET}`) as IUser;
    } catch (error: any) {
        throw new Error(error?.message)
    }
}
