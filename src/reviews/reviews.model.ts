import { DataTypes } from 'sequelize';
import { sequelize } from '../database';
import { IReview } from './interfaces';

const ReviewsModel = sequelize.define<any, IReview>('Review', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    stars: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, { freezeTableName: true, timestamps: true, underscored: true });


export { ReviewsModel };