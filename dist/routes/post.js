"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../validation/auth");
const post_1 = require("../controllers/post");
const router = express_1.default.Router();
router.route('/').post(auth_1.postPostData, post_1.handlePostPost).get(post_1.handleGetPost);
router
    .route('/id/:uuid')
    .delete(post_1.handleDeletePost)
    .put(auth_1.postPutData, post_1.handleEditPost);
router.route('/post-with-user').get(post_1.handlePostWithUser);
exports.default = router;
