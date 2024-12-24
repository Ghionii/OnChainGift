import { ethers } from 'ethers';
import axios from 'axios';

export const giftCardPurchase = async (email, ethAmount, brand) => {
  try {
    // Check if ETH amount is valid
    if (isNaN(ethAmount) || ethAmount <= 0) {
      throw new Error('Invalid amount, please enter a positive number');
    }

    const amountInWei = ethers.parseEther(ethAmount.toString());

    const response = await axios.post(
      'http://localhost:8000/api/giftcard/buy',
      {
        email,
        amount: amountInWei.toString(),
        brand,
      }
    );

    return response.data;
  } catch (error) {
    throw new Error('Error purchasing gift card: ' + error.message);
  }
};

export const fetchEthPrice = async () => {
  try {
    const response = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd'
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching ETH price', error);
    throw error;
  }
};
