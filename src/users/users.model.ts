import { DataTypes } from 'sequelize'
import { sequelize } from '../database';
import { IUser } from './interfaces';

import { USER_ROLE } from './enums/role.enum';
import { PostsModel } from '../posts/posts.model';
import { USER_PERMISSION } from './enums';

import { LogsModel } from '../logs/logs.model';

const UsersModel = sequelize.define<any, IUser>('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM(USER_ROLE.ADMIN, USER_ROLE.USER),
        defaultValue: USER_ROLE.USER
    },
    permissions: {
        type: DataTypes.ARRAY(DataTypes.ENUM(USER_PERMISSION.READ_WRITE, USER_PERMISSION.UPDATE)),
        defaultValue: [USER_PERMISSION.UPDATE],
    }
}, { freezeTableName: true, timestamps: true, underscored: true });

UsersModel.hasMany(PostsModel);
PostsModel.belongsTo(UsersModel);

UsersModel.hasMany(LogsModel);
LogsModel.belongsTo(UsersModel);

export { UsersModel };

