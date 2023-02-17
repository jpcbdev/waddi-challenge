import { USER_ROLE, USER_PERMISSION } from '../enums';
export interface IUser {
    id?: number
    name?: string
    username?: string
    password?: string
    role?: USER_ROLE
    permissions?: USER_PERMISSION[]
}