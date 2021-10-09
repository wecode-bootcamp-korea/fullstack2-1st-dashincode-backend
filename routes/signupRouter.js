import express from 'express';
import { signupController } from '../controllers';

const router = express.Router();

router.get('/', signupController.getCategory);

export default router;