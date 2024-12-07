import express from 'express';
import dotenv from 'dotenv';

const app = express();

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
