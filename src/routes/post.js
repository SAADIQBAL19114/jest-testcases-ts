const express = require("express")
const router = express.Router()
const {postPostData, postPutData} = require('../validation/auth');
const {handlePostPost,handlePostWithUser, handleGetPost, handleDeletePost, handleEditPost} = require('../controllers/post')


router.route('/')
.post(postPostData,handlePostPost)
.get(handleGetPost)

router.route('/id/:uuid')
.delete(handleDeletePost)
.put(postPutData,handleEditPost)

router.route('/post-with-user')
.get(handlePostWithUser)

module.exports = router;
