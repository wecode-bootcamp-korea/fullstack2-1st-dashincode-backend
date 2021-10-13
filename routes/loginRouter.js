import express from 'express';
import { loginController } from '../controllers';

const router = express.Router();

router.post('/', loginController.getUser);

export default router;
