import express from 'express';
import { likeController } from '../controllers';

const router = express.Router();

router.get('/:id', likeController.getLike);
router.get('/:id', likeController.likeProduct);
//token validation 미들웨어 필요

export default router;
