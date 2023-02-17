const { Model, DataTypes } = require(`sequelize`)
const sequelize = require(`../config/connection`)
class Comment extends Model {
}
Comment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: `user`,
                key: `id`
            }
        },
        entry_id: {
            type: DataTypes.INTEGER,
            references: {
                model: `entry`,
                key: `id`
            }
        },
        comment_content: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: `comment`
    }
)
module.exports = Comment