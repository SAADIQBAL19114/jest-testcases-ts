import { Request, Response } from 'express';
const { user, post } = require('../models');

export const handlePostPost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { body, userUuid } = req.body;
  try {
    const user1 = await user.findOne({ where: { uuid: userUuid } });
    if (!user1) {
      return res.status(404).json({ error: 'User not found' });
    }
    const post1 = await post.create({ body, userId: user1.id });
    return res.status(201).json(post1);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const handleGetPost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const post1 = await post.findAll();
    return res.status(200).json(post1);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const handleDeletePost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { uuid } = req.params;
  try {
    const post1 = await post.findOne({ where: { uuid } });
    if (!post1) {
      return res.status(404).json({ error: 'Post not found' });
    }
    await post1.destroy();
    return res.status(200).json({ message: 'Post successfully deleted' });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export const handleEditPost = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  const { uuid } = req.params;
  const { body, userId } = req.body;
  try {
    const post1 = await post.findOne({ where: { uuid } });
    if (!post1) {
      return res.status(404).json({ error: 'Post not found' });
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

export const handlePostWithUser = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const post1 = await post.findAll({ include: ['user'] });
    return res.status(200).json(post1);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

