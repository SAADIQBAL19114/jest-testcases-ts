"use strict";
// import app from './app';
// import db  from './models'; // Adjust the import to match your project structure
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // ---------Listen Function---------
// app.listen(2000, async () => {
//   console.log('The server is running at http://localhost:2000');
//   try {
//     await db.sequelize.authenticate();
//     console.log('Database connected');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }
// });
const app_1 = __importDefault(require("./app"));
app_1.default.listen(process.env.PORT || 8080, () => {
    console.log('App is running on port 8080');
});
