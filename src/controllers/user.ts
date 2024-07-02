import db from '../models';
const { user } = db;
import { Request, Response } from 'express';

//------------User Model Work(POST) POST A NEW USER IN THE DATABASE------------

const handlePostUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { name, email, role } = req.body;
  try {
    if (name !== '' && email !== '' && role !== '') {
      const user1 = await user.create({ name, email, role });
      return res.status(201).json(user1);
    }
    return res.status(400).json('Fields cannot be empty');
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

//------------User Model Work(GET) GET ALL USERS IN THE DATABASE------------

const handleGetAllUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const users = await user.findAll();
    if (users.length > 0) {
      return res.status(200).json(users);
    } else {
      return res.status(400).json('No users in the database');
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

//------------User Model Work(DELETE) A USER IN THE DATABASE------------

const handleDeleteUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const uuid = req.params.uuid;
  try {
    const user1 = await user.findOne({ where: { uuid } });
    if (!user1) {
      return res
        .status(404)
        .send({ message: "There isn't any user of this id exists." });
    }
    await user1.destroy();
    return res.status(200).json('User deleted successfully');
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

//------------User Model Work(EDIT) A USER IN THE DATABASE------------

const handleEditUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const uuid = req.params.uuid;
  const { name, email, role } = req.body;
  try {
    const user1 = await user.findOne({ where: { uuid } });
    if (!user1) {
      return res
        .status(400)
        .json({ message: "There isn't any user of this id exists." });
    }
    user1.name = name;
    user1.email = email;
    user1.role = role;
    await user1.save();
    return res.status(201).json(user1);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

//------------User Model Work(GET) A USER USING HIS ID IN THE DATABASE------------

const handleGetOneUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const uuid = req.params.uuid;
  try {
    const user1 = await user.findOne({ where: { uuid } });
    if (!user1) {
      return res
        .status(404)
        .send({ message: `User with id ${uuid} not found.` });
    }
    return res.status(200).json(user1);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

//------------User Model Work(GET) A USER WITH ALL HIS POSTS IN THE DATABASE------------

const handleUserWithPost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  console.log('this is a test text');
  try {
    const user1 = await user.findAll({ include: 'post' });
    return res.status(200).json(user1);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const handleUserWithPosts = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const uuid = req.params.uuid;
  try {
    const user1 = await user.findOne({ where: { uuid }, include: 'post' });
    return res.status(200).json(user1);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export {
  handlePostUser,
  handleGetAllUser,
  handleDeleteUser,
  handleEditUser,
  handleGetOneUser,
  handleUserWithPost,
  handleUserWithPosts,
};
