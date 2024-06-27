'use strict';
import { Model, DataTypes, Sequelize } from 'sequelize';

interface UserAttributes {
  id?: number;
  uuid: string;
  name: string;
  email: string;
  role: string;
}

module.exports = (sequelize: Sequelize) => {
  class user extends Model<UserAttributes> implements UserAttributes {
    id!: number;
    uuid!: string;
    name!: string;
    email!: string;
    role!: string;

    static associate(models: any) {
      // define association here
      this.hasMany(models.post, { foreignKey: 'userId', as: 'post' });
    }
  }

  user.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: 'Please enter your name',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: 'must be and email',
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'user',
    },
  );
  return user;
};
