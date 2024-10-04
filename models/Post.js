const {Model, DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class Post extends Model{}


Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        text_post: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
               len: [200, 1500] 
            }
        },
        created_at:{
            type: DataTypes.DATE,
            allowNull: false

        },
        author_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            }
        },
        
    },
    {
        sequelize,
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        modelName: 'post'
    }
)

module.exports = Post;