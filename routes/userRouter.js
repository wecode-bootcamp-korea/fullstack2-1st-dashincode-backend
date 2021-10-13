import express from 'express';
import { userController } from '../controllers';

const router = express.Router();

router.post('/login', userController.getUser);
router.post('/signup', userController.insertUser);

export default router;
