const {Model, DataTypes} = require('sequelize');

const sequelize = require('../config/connection');

class Image extends Model {}

Image.init ({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    img: {
        type: DataTypes.BLOB,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "user",
            key: "id",
        },
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "post",
            key: "id",
        },
    },

},
{
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'image',
}
)