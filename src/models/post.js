
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user }) {
      // define association here
      this.belongsTo(user, { foreignKey: 'userId', as: 'user' })
    }
  }
  post.init({
    // uuid: {
    //   type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4,
    // },
    body: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      notNull: {
        msg: 'Post can not be empty'
      }
    }
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};