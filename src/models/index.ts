import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize';
import process from 'process';
import configJSON from '../config/config.json';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = (configJSON as any)[env];
 const db: any = {};

let sequelize: any;
if (config?.use_env_variable) {
  sequelize = new Sequelize(
    process.env[config.use_env_variable] as string,
    config,
  );
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

fs.readdirSync(__dirname)
  .filter((file: string) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      (file.slice(-3) === '.js' || file.slice(-3) === '.ts')
    );
  })
  .forEach((file: any) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      sequelize.DataTypes,
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

console.log('>>>>>>>>>>>>', Object.keys(db));

export {
    db
}
