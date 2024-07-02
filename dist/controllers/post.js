"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleEditPost = exports.handleDeletePost = exports.handleGetPost = exports.handlePostWithUser = exports.handlePostPost = void 0;
const models_1 = __importDefault(require("../models"));
const { user, post } = models_1.default;
//------------Post Model Work(POST) POST A NEW POST IN THE DATABASE------------
const handlePostPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body, userUuid } = req.body;
    try {
        const user1 = yield user.findOne({ where: { uuid: userUuid } });
        if (!user1) {
            return res.status(404).json({ message: 'User not found.' });
        }
        const post1 = yield post.create({ body, userId: user1.id });
        return res.status(201).json(post1);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});
exports.handlePostPost = handlePostPost;
//------------Post Model Work(GET) GET ALL POSTS IN THE DATABASE------------
const handleGetPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post.findAll();
        return res.status(200).json(posts);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});
exports.handleGetPost = handleGetPost;
//------------Post Model Work(DELETE) DELETE A POST IN THE DATABASE------------
const handleDeletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uuid = req.params.uuid;
    try {
        const post1 = yield post.findOne({ where: { uuid } });
        if (!post1) {
            return res
                .status(404)
                .send({ message: "There isn't any post of this id exists." });
        }
        yield post1.destroy();
        return res.status(200).json('Post successfully deleted');
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});
exports.handleDeletePost = handleDeletePost;
//------------Post Model Work(EDIT) EDIT A POST IN THE DATABASE------------
const handleEditPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uuid = req.params.uuid;
    const { body, userId } = req.body;
    try {
        const post1 = yield post.findOne({ where: { uuid } });
        if (!post1) {
            return res
                .status(400)
                .json({ message: "There isn't any post of this id exists." });
        }
        post1.body = body;
        post1.userId = userId;
        yield post1.save();
        return res.status(200).json(post1);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});
exports.handleEditPost = handleEditPost;
//------------Post Model Work(GET) GET ALL POSTS WITH USERS IN THE DATABASE------------
const handlePostWithUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield post.findAll({ include: ['user'] });
        return res.status(200).json(posts);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});
exports.handlePostWithUser = handlePostWithUser;
