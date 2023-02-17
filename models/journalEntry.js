const { Model, DataTypes } = require(`sequelize`)
const sequelize = require(`../config/connection`)

class Entry extends Model { }
Entry.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        entry_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        entry_content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: `user`,
                key: `id`
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName:  `entry`
    }
)
module.exports = Entry