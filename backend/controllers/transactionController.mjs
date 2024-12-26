import GiftCardPurchase from '../model/giftCardModel.mjs';
import { sendEmail } from '../Service/emailService.mjs';
import { ethers } from 'ethers';
import { v4 as uuidv4 } from 'uuid';
import { provider } from '../Service/Blockchain.mjs';

export const buyGiftCard = async (req, res) => {
  try {
    const { email, amount, brand, transactionHash } = req.body;

    console.log('Email:', email, 'Amount:', amount);

    if (
      !email ||
      !amount ||
      !brand ||
      !transactionHash ||
      typeof email !== 'string'
    ) {
      return res
        .status(400)
        .json({ error: 'Invalid input, all fields are required' });
    }

    const supportedBrands = ['H&M', 'Amazon', 'Apple'];
    if (!supportedBrands.includes(brand)) {
      return res.status(400).json({ error: 'Invalid Brand selected' });
    }

    // Get the transaction receipt
    const receipt = await provider.getTransactionReceipt(transactionHash);
    if (!receipt) {
      return res.status(400).json({ error: 'Transaction not found' });
    }

    const buyerAddress = receipt.from;

    const amountInETH = ethers.formatEther(amount);
    const formattedAmount = parseFloat(amountInETH).toFixed(4);

    const giftCardCode = uuidv4();

    // Save the transaction details in MongoDB
    const giftCard = new GiftCardPurchase({
      RecipientEmail: email,
      BuyerAddress: buyerAddress,
      Amount: amount,
      Brand: brand,
      GiftCardCode: giftCardCode,
      TransactionHash: transactionHash,
    });

    await giftCard.save();

    const subject = 'Your Gift Card Purchase Confirmation';
    const text = `Thank you for your purchase. Your gift card from ${brand} with ${formattedAmount} ETH is confirmed.`;
    const html = `<h1>Gift Card Purchase Confirmation</h1>
                  <p>Thank you for your purchase</p>
                  <p><strong>Brand:</strong> ${brand}</p>
                  <p><strong>Amount:</strong> ${formattedAmount} ETH</p>
                  <p><strong>Gift Card Code:</strong> ${giftCardCode}</p>`;

    await sendEmail(email, subject, text, html);

    res.status(201).json({
      message: 'Gift card purchased successfully',
      giftCardCode,
      transactionHash,
    });
  } catch (error) {
    console.error('Error buying Gift Card:', error);

    res
      .status(500)
      .json({ error: 'Transaction Failed', details: error.message });
  }
};
