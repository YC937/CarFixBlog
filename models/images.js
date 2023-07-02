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
    originalname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    size: {
            type: DataTypes.INTEGER,
            allowNull: false,
    },
    mimetype: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    destination: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    encoding: {
        type: DataTypes.STRING,
        allowNull: false
    }

    // img: {
    //     type: DataTypes.BLOB,
    //     allowNull: false,
    // },
    // user_id: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: "user",
    //         key: "id",
    //     },
    // },
    // post_id: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: "post",
    //         key: "id",
    //     },
    // },

},
{
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'image',
}
);

module.exports = Image;