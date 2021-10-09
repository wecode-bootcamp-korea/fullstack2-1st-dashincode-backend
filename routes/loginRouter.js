import express from 'express';
import { loginController } from '../controllers';

const router = express.Router();

router.get('/', loginController.getCategory);

export default router;