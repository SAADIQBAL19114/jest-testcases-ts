"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../validation/auth");
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router.route('/').post(auth_1.userPostData, user_1.handlePostUser).get(user_1.handleGetAllUser);
router
    .route('/id/:uuid')
    .delete(user_1.handleDeleteUser)
    .put(auth_1.userPutData, user_1.handleEditUser)
    .get(user_1.handleGetOneUser);
router.route('/id1/:uuid').get(user_1.handleUserWithPosts);
router.route('/user-with-post').get(user_1.handleUserWithPost);
exports.default = router;
