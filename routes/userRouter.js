import express from 'express';
import { body } from 'express-validator';
import userValidation from '../middlewares/userValidation';
import { userController } from '../controllers';

const router = express.Router();

router.post(
  '/login',
  [
    body('email')
      .exists()
      .isEmail()
      .isLength({ max: 20 })
      .withMessage('이메일 형식 오류'),
    body('password')
      .exists()
      .isLength({ min: 8, max: 20 })
      .withMessage('패스워드 형식 오류'),
    userValidation,
  ],
  userController.getUser
);
router.post(
  '/signup',
  [
    body('email')
      .exists()
      .isEmail()
      .isLength({ max: 20 })
      .withMessage('이메일 형식 오류'),
    body('password')
      .exists()
      .isLength({ min: 8, max: 20 })
      .withMessage('패스워드 형식 오류'),
    body('nickname')
      .exists()
      .isLength({ min: 3, max: 20 })
      .withMessage('닉네임 형식 오류'),
    userValidation,
  ],
  userController.insertUser
);

export default router;
