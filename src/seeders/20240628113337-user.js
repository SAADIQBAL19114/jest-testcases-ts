'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          uuid: '7bf6ee45-f804-472e-a9c7-5e6612f74fce',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid: 'ab14e583-0522-416a-9d51-08170d58809b',
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, DataTypes) {
    await queryInterface.bulkDelete('users', null, {});
  },
};
