import { DataTypes } from 'sequelize';
import { sequelize } from '../database';
import { ILog } from './interfaces';

const LogsModel = sequelize.define<any, ILog>('Log', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { freezeTableName: true, timestamps: true, underscored: true });


export { LogsModel };