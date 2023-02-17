import { DataTypes } from 'sequelize';
import { sequelize } from '../database';
import { IPost } from './interfaces';

import { ReviewsModel } from '../reviews/reviews.model';

const PostsModel = sequelize.define<any, IPost>('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, { freezeTableName: true, timestamps: true, underscored: true });

PostsModel.hasMany(ReviewsModel);
ReviewsModel.belongsTo(PostsModel);

export { PostsModel };