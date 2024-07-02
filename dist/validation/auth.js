"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postPutData = exports.postPostData = exports.userPutData = exports.userPostData = void 0;
const express_validator_1 = require("express-validator");
const validatorFunction = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    else
        next();
};
exports.userPostData = [
    (0, express_validator_1.check)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('name')
        .isLength({ min: 3 })
        .withMessage('minimum 3 letters are required')
        .trim()
        .isAlpha('en-US', { ignore: /\s/ })
        .withMessage('Numbers cannot be used in the name.'),
    (0, express_validator_1.check)('email').notEmpty().withMessage('Email is required'),
    (0, express_validator_1.body)('email').trim().isEmail().withMessage('must be a valid email'),
    (0, express_validator_1.check)('role').notEmpty().withMessage('Role is required'),
    (0, express_validator_1.body)('role').trim().isAlpha('en-US', { ignore: /\s/ }),
    validatorFunction,
];
exports.userPutData = [
    (0, express_validator_1.check)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('name')
        .isLength({ min: 3 })
        .withMessage('minimum 3 letters are required')
        .trim()
        .isAlpha('en-US', { ignore: /\s/ })
        .withMessage('Numbers cannot be used in the name.'),
    (0, express_validator_1.check)('email').notEmpty().withMessage('Email is required'),
    (0, express_validator_1.body)('email').trim().isEmail().withMessage('must be a valid email'),
    (0, express_validator_1.check)('role').notEmpty().withMessage('Role is required'),
    (0, express_validator_1.body)('role').trim().isAlpha('en-US', { ignore: /\s/ }),
    validatorFunction,
];
exports.postPostData = [
    (0, express_validator_1.check)('body').notEmpty().withMessage('Post can not be empty'),
    (0, express_validator_1.body)('body').trim(),
    (0, express_validator_1.check)('userUuid').notEmpty().withMessage('uuid can not be empty'),
    (0, express_validator_1.body)('userUuid').trim(),
    validatorFunction,
];
exports.postPutData = [
    (0, express_validator_1.check)('body').notEmpty().withMessage('Post can not be empty'),
    (0, express_validator_1.body)('body').trim(),
    (0, express_validator_1.check)('userId').notEmpty().withMessage('userId can not be empty'),
    (0, express_validator_1.body)('userId').trim(),
    validatorFunction,
];
