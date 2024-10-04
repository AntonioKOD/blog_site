const { Model, DataTypes } = require('sequelize')

const bcrypt = require('bcryptjs')

const sequelize = require('../config/connection')
const { underscoredIf } = require('sequelize/lib/utils')


class Comment extends Model{}


Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        author_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        }

    },
    {
    sequelize,
    freezeTableName: true,
    timestamps: true,
    underscored: true,
    modelName: 'comment',
    }
);

module.exports = Comment;