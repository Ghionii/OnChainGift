// filepath: backend/controllers/contractController.js
import { getContractDetails } from '../Service/Blockchain.mjs';

export const fetchContractDetails = (req, res) => {
  try {
    const details = getContractDetails();
    res.json(details);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch contract details' });
  }
};
