import { Request, Response } from 'express';
import db from '../models';
const { user, post } = db;

//------------Post Model Work(POST) POST A NEW POST IN THE DATABASE------------

const handlePostPost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { body, userUuid } = req.body;
  try {
    const user1 = await user.findOne({ where: { uuid: userUuid } });
    if (!user1) {
      return res.status(404).json({ message: 'User not found.' });
    }
    const post1 = await post.create({ body, userId: user1.id });
    return res.status(201).json(post1);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

//------------Post Model Work(GET) GET ALL POSTS IN THE DATABASE------------

const handleGetPost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const posts = await post.findAll();
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

//------------Post Model Work(DELETE) DELETE A POST IN THE DATABASE------------

const handleDeletePost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const uuid = req.params.uuid;
  try {
    const post1 = await post.findOne({ where: { uuid } });
    if (!post1) {
      return res
        .status(404)
        .send({ message: "There isn't any post of this id exists." });
    }
    await post1.destroy();
    return res.status(200).json('Post successfully deleted');
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

//------------Post Model Work(EDIT) EDIT A POST IN THE DATABASE------------

const handleEditPost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const uuid = req.params.uuid;
  const { body, userId } = req.body;
  try {
    const post1 = await post.findOne({ where: { uuid } });
    if (!post1) {
      return res
        .status(400)
        .json({ message: "There isn't any post of this id exists." });
    }
    post1.body = body;
    post1.userId = userId;
    await post1.save();
    return res.status(200).json(post1);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

//------------Post Model Work(GET) GET ALL POSTS WITH USERS IN THE DATABASE------------

const handlePostWithUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const posts = await post.findAll({ include: ['user'] });
    return res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export {
  handlePostPost,
  handlePostWithUser,
  handleGetPost,
  handleDeletePost,
  handleEditPost,
};
