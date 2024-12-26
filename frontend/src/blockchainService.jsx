import { ethers } from 'ethers';
import axios from 'axios';

const getContractDetails = async () => {
  const response = await axios.get(
    'http://localhost:8000/api/contract/details'
  );
  return response.data;
};

export const giftCardPurchase = async (email, ethAmount, brand) => {
  try {
    if (isNaN(ethAmount) || ethAmount <= 0) {
      throw new Error('Invalid amount, please enter a positive number');
    }

    const { ethereum } = window;
    if (!ethereum) {
      throw new Error('MetaMask is not installed');
    }

    await ethereum.request({ method: 'eth_requestAccounts' });

    const ethersProvider = new ethers.BrowserProvider(ethereum);
    const signer = await ethersProvider.getSigner();

    const { abi, address } = await getContractDetails();
    const contract = new ethers.Contract(address, abi, signer);

    const amountInWei = ethers.parseEther(ethAmount.toString());

    const txResponse = await contract.purchaseGiftCard(email, {
      value: amountInWei,
    });

    await txResponse.wait();

    const response = await axios.post(
      'http://localhost:8000/api/giftcard/buy',
      {
        email,
        amount: amountInWei.toString(),
        brand,
        transactionHash: txResponse.hash,
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
