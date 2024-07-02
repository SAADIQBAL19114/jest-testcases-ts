'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // First, fetch some user ids to associate with posts
    const users = await queryInterface.sequelize.query(`SELECT id from users;`);

    const userRows = users[0];

    await queryInterface.bulkInsert(
      'posts',
      [
        {
          uuid:"64abb336-4a72-4b9d-ad79-0a873bf15933",
          body: 'This is the first post. It contains some interesting content.',
          userId: userRows[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid:"7ff7c406-afa3-4c54-9a84-4fa6a1850a04",
          body: "Here's another post. It's unique and can't be empty.",
          userId: userRows[1].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          uuid:"9972246c-2bdc-489e-baf4-fc354912bb23",
          
          body: 'The third post is just as important as the first two!',
          userId: userRows[0].id,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('posts', null, {});
  },
};
