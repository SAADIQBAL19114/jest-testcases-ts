// import app from './app';
// import db  from './models'; // Adjust the import to match your project structure

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


import app from './app';

app.listen(process.env.PORT || 8080, () => {
  console.log('App is running on port 8080');
});
