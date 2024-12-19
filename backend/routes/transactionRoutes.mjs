import express from 'express';
import { buyGiftCard } from '../controllers/transactionController.mjs';

const router = express.Router();

router.post('/buy', buyGiftCard);

export default router;
