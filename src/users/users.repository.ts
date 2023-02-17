import { IUser } from './interfaces';
import { UsersModel } from './users.model';

import { USER_ROLE } from './enums';

export class UsersRepository {

    public async getUsers(): Promise<IUser[]> {
        return UsersModel.findAll({ where: { role: USER_ROLE.USER }, order: [['id', 'DESC']] });
    }

    public async getUser(conditions = {}): Promise<IUser> {
        return UsersModel.findOne({ where: conditions });
    }

    public async createUser(dto: IUser): Promise<IUser> {
        return UsersModel.create(dto as any);
    }

    public async updateUser(id: number, dto: IUser) {
        return UsersModel.update(dto, { where: { id, role: USER_ROLE.USER } })
    }

    public async deleteUser(id: number) {
        return UsersModel.destroy({ where: { id, role: USER_ROLE.USER } })
    }

}