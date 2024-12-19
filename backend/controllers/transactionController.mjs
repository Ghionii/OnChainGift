import { ethers } from 'ethers';
import { purchaseGiftCard } from '../Service/Blockchain.mjs';

export const buyGiftCard = async (req, res) => {
  try {
    const { email, amount } = req.body;

    console.log('Email', email);

    if (!email || !amount || typeof email !== 'string') {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const txReciept = await purchaseGiftCard(email, amount);

    res
      .status(200)
      .json({ message: 'Transaction Successfull', reciept: txReciept });
  } catch (error) {
    console.error('Error buying Gift Card', error);

    res
      .status(500)
      .json({ error: 'Transaction Failed', details: error.message });
  }
};
