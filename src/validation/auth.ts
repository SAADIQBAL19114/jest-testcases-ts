import { Request, Response, NextFunction } from 'express';
import { body, check, validationResult } from 'express-validator';

const validatorFunction = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else next();
};

export const userPostData = [
  check('name').notEmpty().withMessage('Name is required'),
  body('name')
    .isLength({ min: 3 })
    .withMessage('minimum 3 letters are required')
    .trim()
    .isAlpha('en-US', { ignore: /\s/ })
    .withMessage('Numbers cannot be used in the name.'),
  check('email').notEmpty().withMessage('Email is required'),
  body('email').trim().isEmail().withMessage('must be a valid email'),
  check('role').notEmpty().withMessage('Role is required'),
  body('role').trim().isAlpha('en-US', { ignore: /\s/ }),

  validatorFunction,
];

export const userPutData = [
  check('name').notEmpty().withMessage('Name is required'),
  body('name')
    .isLength({ min: 3 })
    .withMessage('minimum 3 letters are required')
    .trim()
    .isAlpha('en-US', { ignore: /\s/ })
    .withMessage('Numbers cannot be used in the name.'),
  check('email').notEmpty().withMessage('Email is required'),
  body('email').trim().isEmail().withMessage('must be a valid email'),
  check('role').notEmpty().withMessage('Role is required'),
  body('role').trim().isAlpha('en-US', { ignore: /\s/ }),

  validatorFunction,
];

export const postPostData = [
  check('body').notEmpty().withMessage('Post can not be empty'),
  body('body').trim(),
  check('userUuid').notEmpty().withMessage('uuid can not be empty'),
  body('userUuid').trim(),
  validatorFunction,
];

export const postPutData = [
  check('body').notEmpty().withMessage('Post can not be empty'),
  body('body').trim(),
  check('userId').notEmpty().withMessage('userId can not be empty'),
  body('userId').trim(),
  validatorFunction,
];
