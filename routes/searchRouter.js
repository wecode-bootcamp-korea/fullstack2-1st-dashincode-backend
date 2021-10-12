import express from 'express';
import { searchController } from '../controllers';

const router = express.Router();

router.get('/', searchController.searchProducts);

export default router;
