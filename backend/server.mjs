import express from 'express';
import dotenv from 'dotenv';
import transactionRouter from './routes/transactionRoutes.mjs';
import giftCardRouter from './routes/giftCardRoutes.mjs';
import { connectDB } from './config/mongoDB.mjs';

const app = express();

connectDB();

app.use(express.json());
app.use('/api/giftcard', transactionRouter);
app.use('/api/giftcard', giftCardRouter);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
