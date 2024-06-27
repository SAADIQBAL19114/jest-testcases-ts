import express from 'express';
import { userPostData, userPutData } from '../validation/auth';
import {
  handlePostUser,
  handleGetAllUser,
  handleDeleteUser,
  handleEditUser,
  handleGetOneUser,
  handleUserWithPost,
  handleUserWithPosts,
} from '../controllers/user';

const router = express.Router();

router.route('/').post(userPostData, handlePostUser).get(handleGetAllUser);

router
  .route('/id/:uuid')
  .delete(handleDeleteUser)
  .put(userPutData, handleEditUser)
  .get(handleGetOneUser);

router.route('/id1/:uuid').get(handleUserWithPosts);

router.route('/user-with-post').get(handleUserWithPost);

export default router;
