import { ethers } from 'ethers';
import contractABI from '../Script/contractABI.json' assert { type: 'json' };
import * as dotenv from 'dotenv';

dotenv.config();

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const SEPOLIA_CONTRACT_ADDRESS = process.env.SEPOLIA_CONTRACT_ADDRESS;
const provider = new ethers.JsonRpcProvider(
  `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
);

// Initialize the contract with the signer
const contract = new ethers.Contract(SEPOLIA_CONTRACT_ADDRESS, contractABI);

export const getContractDetails = () => {
  return {
    abi: contractABI,
    address: SEPOLIA_CONTRACT_ADDRESS,
  };
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

export { provider, SEPOLIA_CONTRACT_ADDRESS };
