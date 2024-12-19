import express from 'express';
import { addGiftCardPurschase } from '../controllers/giftCardController.mjs';

const router = express.Router();

router.post('/add', addGiftCardPurschase);

export default router;
