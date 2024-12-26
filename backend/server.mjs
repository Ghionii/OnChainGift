import express from 'express';
import dotenv from 'dotenv';
import transactionRouter from './routes/transactionRoutes.mjs';
import giftCardRouter from './routes/giftCardRoutes.mjs';
import { connectDB } from './config/mongoDB.mjs';
import contractRouter from './routes/contractRoutes.mjs';
import cors from 'cors';
const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

connectDB();

app.use(express.json());
app.use('/api/giftcard', transactionRouter);
app.use('/api/giftcard', giftCardRouter);
app.use('/api/contract', contractRouter);

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
