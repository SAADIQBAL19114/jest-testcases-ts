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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUserWithPosts = exports.handleUserWithPost = exports.handleGetOneUser = exports.handleEditUser = exports.handleDeleteUser = exports.handleGetAllUser = exports.handlePostUser = void 0;
const { user } = require('../models');
//------------User Model Work(POST) POST A NEW USER IN THE DATABASE------------
const handlePostUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, role } = req.body;
    try {
        if (name !== '' && email !== '' && role !== '') {
            const user1 = yield user.create({ name, email, role });
            return res.status(201).json(user1);
        }
        return res.status(400).json('Fields cannot be empty');
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});
exports.handlePostUser = handlePostUser;
//------------User Model Work(GET) GET ALL USERS IN THE DATABASE------------
const handleGetAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user.findAll();
        if (users.length > 0) {
            return res.status(200).json(users);
        }
        else {
            return res.status(400).json('No users in the database');
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});
exports.handleGetAllUser = handleGetAllUser;
//------------User Model Work(DELETE) A USER IN THE DATABASE------------
const handleDeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uuid = req.params.uuid;
    try {
        const user1 = yield user.findOne({ where: { uuid } });
        if (!user1) {
            return res
                .status(404)
                .send({ message: "There isn't any user of this id exists." });
        }
        yield user1.destroy();
        return res.status(200).json('User deleted successfully');
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});
exports.handleDeleteUser = handleDeleteUser;
//------------User Model Work(EDIT) A USER IN THE DATABASE------------
const handleEditUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uuid = req.params.uuid;
    const { name, email, role } = req.body;
    try {
        const user1 = yield user.findOne({ where: { uuid } });
        if (!user1) {
            return res
                .status(400)
                .json({ message: "There isn't any user of this id exists." });
        }
        user1.name = name;
        user1.email = email;
        user1.role = role;
        yield user1.save();
        return res.status(201).json(user1);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});
exports.handleEditUser = handleEditUser;
//------------User Model Work(GET) A USER USING HIS ID IN THE DATABASE------------
const handleGetOneUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uuid = req.params.uuid;
    try {
        const user1 = yield user.findOne({ where: { uuid } });
        if (!user1) {
            return res
                .status(404)
                .send({ message: `User with id ${uuid} not found.` });
        }
        return res.status(200).json(user1);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});
exports.handleGetOneUser = handleGetOneUser;
//------------User Model Work(GET) A USER WITH ALL HIS POSTS IN THE DATABASE------------
const handleUserWithPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('this is a test text');
    try {
        const user1 = yield user.findAll({ include: 'post' });
        return res.status(200).json(user1);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});
exports.handleUserWithPost = handleUserWithPost;
const handleUserWithPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const uuid = req.params.uuid;
    try {
        const user1 = yield user.findOne({ where: { uuid }, include: 'post' });
        return res.status(200).json(user1);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
});
exports.handleUserWithPosts = handleUserWithPosts;
