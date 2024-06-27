import  express from 'express';
import { postPostData, postPutData } from '../validation/auth';
import {
  handlePostPost,
  handlePostWithUser,
  handleGetPost,
  handleDeletePost,
  handleEditPost,
} from '../controllers/post';

const router = express.Router();

router.route('/').post(postPostData, handlePostPost).get(handleGetPost);

router
  .route('/id/:uuid')
  .delete(handleDeletePost)
  .put(postPutData, handleEditPost);

router.route('/post-with-user').get(handlePostWithUser);

export default router;
