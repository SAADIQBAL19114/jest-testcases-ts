const express = require('express');
const {userPostData, userPutData} = require('../validation/auth');
const router = express.Router();

const {
  handlePostUser,
  handleGetAllUser,
  handleDeleteUser,
  handleEditUser,
  handleGetOneUser,
  handleUserWithPost,
  handleUserWithPosts,
} = require('../controllers/user');

router.route('/').post(userPostData, handlePostUser).get(handleGetAllUser);

router
  .route('/id/:uuid')
  .delete(handleDeleteUser)
  .put(userPutData,handleEditUser)
  .get(handleGetOneUser);

router.route('/id1/:uuid').get(handleUserWithPosts);

router.route('/user-with-post').get(handleUserWithPost);

module.exports = router;
