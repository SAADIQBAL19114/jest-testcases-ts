'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    class user extends sequelize_1.Model {
        static associate(models) {
            // define association here
            this.hasMany(models.post, { foreignKey: 'userId', as: 'post' });
        }
    }
    user.init({
        uuid: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
        },
        name: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    msg: 'Please enter your name',
                },
            },
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'must be and email',
                },
            },
        },
        role: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            validate: {
                isAlpha: true,
            },
        },
    }, {
        sequelize,
        modelName: 'user',
    });
    return user;
};
