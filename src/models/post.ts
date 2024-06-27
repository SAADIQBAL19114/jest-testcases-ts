
import { Model, DataTypes, Sequelize } from 'sequelize';

interface PostAttributes {
  id?: number;
  uuid: string;
  userId: number;
  body: string;
}

module.exports = (sequelize: Sequelize) => {
  class post extends Model<PostAttributes> implements PostAttributes {
    id!: number;
    uuid!: string;
    userId!: number;
    body!: string;

    static associate(models: any) {
      // define association here
      this.belongsTo(models.user, { foreignKey: 'userId', as: 'user' });
    }
  }
  

  post.init({
   id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      body: {
        type: DataTypes.STRING,
        allowNull:false
      },
      userId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references :{
          model: 'users',
          key:'id'
        }
      },
  }, {
    sequelize,
    modelName: 'post',
  });
  return post;
};