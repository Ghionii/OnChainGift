import { ethers } from 'ethers';
import contractABI from '../Script/contractABI.json' assert { type: 'json' };
import * as dotenv from 'dotenv';

dotenv.config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const SEPOLIA_CONTRACT_ADDRESS = process.env.SEPOLIA_CONTRACT_ADDRESS;
const privatekey = process.env.SEPOLIA_PRIVATE_KEY;
const provider = new ethers.JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
);
const signer = new ethers.Wallet(privatekey, provider);

// Initialize the contract with the signer
const contract = new ethers.Contract(
  SEPOLIA_CONTRACT_ADDRESS,
  contractABI,
  signer
);

export const getGiftCardPrice = async () => {
  try {
    const price = await contract.giftCardPrice();
    console.log('Gift Card Price (in wei)', price.toString());
    return price;
  } catch (error) {
    console.error('Gift card price couldnt be fetched', error);
  }
};

export const purchaseGiftCard = async (email, amount) => {
  try {
    // Send the transaction
    const txResponse = await contract.purchaseGiftCard(email, {
      value: amount,
    });
    console.log('Transaction sent! Hash:', txResponse.hash);

    // waiting for the transaction to be confirmed
    return txResponse;
  } catch (error) {
    console.error('Error during transaction:', error);
  }
};
export { provider, SEPOLIA_CONTRACT_ADDRESS, privatekey, signer };
