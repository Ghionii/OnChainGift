import express from 'express';
import { fetchContractDetails } from '../controllers/contractController.mjs';

const router = express.Router();

router.get('/details', fetchContractDetails);

export default router;
