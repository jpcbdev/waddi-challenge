import { USER_PERMISSION, USER_ROLE } from './enums';
import { IUser } from './interfaces';
import { UsersRepository } from './users.repository';

import { jwtSignIn } from '../shared/utils/jwt.util';

export class UsersService {

    private readonly usersRepository = new UsersRepository();

    public async getUsers(): Promise<IUser[]> {
        const users = await this.usersRepository.getUsers();
        return users;
    }

    public async getUser(id: number): Promise<IUser> {
        const user = await this.usersRepository.getUser({ id });
        return user;
    }

    public async signing(username: string, password: string): Promise<string> {
        const user = await this.usersRepository.getUser({ username, password });
        if (!user) { throw new Error('User not found') };
        return jwtSignIn({ id: user.id, name: user.name, role: user.role, permissions: user.permissions, username: user.username }) as string;
    }

    public async createUser(dto: IUser): Promise<IUser | void> {
        try {
            const user = await this.usersRepository.createUser(dto);
            return user;
        } catch (error: any) {
            if (error?.name === 'SequelizeUniqueConstraintError') {
                throw new Error('Username already exist');
            }
        }
    }

    public async updateUser(id: number, dto: IUser) {
        const user = await this.usersRepository.updateUser(id, dto);
        return user;
    }

    public async deleteUser(id: number) {
        const user = await this.usersRepository.deleteUser(id);
        return user;
    }

    public async checkUserPermission(userId: number, requiredPermission: USER_PERMISSION): Promise<void> {
        try {
            const user = await this.usersRepository.getUser({ id: userId });
            if (user.role === USER_ROLE.USER && !user.permissions.includes(requiredPermission)) {
                throw new Error(`You don't have ${requiredPermission.toUpperCase()} permission`);
            }
        } catch (error: any) {
            throw new Error(error);
        }
    }

}