import { ethers } from 'ethers';
import axios from 'axios';

export const giftCardPurchase = async (email, amount) => {
  try {
    // Check if amount is valid
    const ethAmount = parseFloat(amount);
    if (isNaN(ethAmount) || ethAmount <= 0) {
      throw new Error('Invalid amount, please enter a positive number');
    }

    const amountInEther = ethers.parseEther(ethAmount.toString());

    const response = await axios.post(
      `http://localhost:8000/api/giftcard/buy`,
      {
        email,
        amount: amountInEther.toString(),
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Transaction Failed');
  }
};
