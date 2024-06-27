import { Request, Response } from 'express';
const {user} =require('../models');

//------------User Model Work(POST) POST A NEW USER IN THE DATABASE------------

export const handlePostUser = async (
  req: Request,
  res: Response,
)=> {
  const { name, email, role } = req.body;
  try {
    if (name !== '' && email !== '' && role !== '') {
      const user1 = await user.create({ name, email, role });
      return res.status(201).json(user1);
    } else {
      return res.status(400).json('Fields cannot be empty');
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

//------------User Model Work(GET) GET All USER IN THE DATABASE------------

export const handleGetAllUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const users = await user.findAll();
    if (users.length > 0) {
      return res.status(200).json(users);
    } else {
      return res.status(400).json('No user in the database');
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

//------------User Model Work(DELETE) A USER IN THE DATABASE------------

export const handleDeleteUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { uuid } = req.params;
  try {
    const user1 = await user.findOne({ where: { uuid } });
    if (user1) {
      await user1.destroy();
      return res.status(200).json('User deleted successfully');
    } else {
      return res.status(404).json('User not found');
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

//------------User Model Work(EDIT) A USER IN THE DATABASE------------

export const handleEditUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { uuid } = req.params;
  const { name, email, role } = req.body;
  try {
    const user1 = await user.findOne({ where: { uuid } });
    if (user1) {
      user1.name = name;
      user1.email = email;
      user1.role = role;
      await user1.save();
      return res.status(200).json(user1);
    } else {
      return res.status(404).json('User not found');
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

//------------User Model Work(GET) A USER USING HIS ID IN THE DATABASE------------

export const handleGetOneUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { uuid } = req.params;
  try {
    const user1 = await user.findOne({ where: { uuid } });
    if (user1) {
      return res.status(200).json(user1);
    } else {
      return res.status(404).json('User not found');
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

//------------User Model Work(GET) A USER WITH ALL HIS POSTS IN THE DATABASE------------

export const handleUserWithPost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const user1 = await user.findAll({ include: 'post' });
    return res.status(200).json(user1);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const handleUserWithPosts = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { uuid } = req.params;
  try {
    const user1 = await user.findOne({ where: { uuid }, include: 'post' });
    if (user1) {
      return res.status(200).json(user1);
    } else {
      return res.status(404).json('User not found');
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};
