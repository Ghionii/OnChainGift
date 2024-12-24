import { purchaseGiftCard } from '../Service/Blockchain.mjs';
import GiftCardPurchase from '../model/giftCardModel.mjs';
import { sendEmail } from '../Service/emailService.mjs';
import { ethers } from 'ethers';
import { v4 as uuidv4 } from 'uuid';

export const buyGiftCard = async (req, res) => {
  try {
    const { email, amount, brand } = req.body;

    console.log('Email:', email, 'Amount:', amount);

    if (!email || !amount || !brand || typeof email !== 'string') {
      return res
        .status(400)
        .json({ error: 'Invalid input, Email and amount are required' });
    }

    const supportedBrands = ['H&M', 'Amazon', 'Apple'];

    if (!supportedBrands.includes(brand)) {
      return res.status(400).json({ error: 'Invalid Brand selected' });
    }

    const amountInETH = ethers.formatEther(amount);
    const formattedAmount = parseFloat(amountInETH).toFixed(4);

    const giftCardCode = uuidv4();

    // Call the purchaseGiftCard function
    const txResponse = await purchaseGiftCard(email, amount);

    // Wait for the transaction to be confirmed
    const txReceipt = await txResponse.wait();

    // Save the transaction details in MongoDB
    const dbTransaction = new GiftCardPurchase({
      TransactionHash: txResponse.hash,
      BuyerAddress: txResponse.from,
      Brand: brand,
      code: giftCardCode,
      RecipientEmail: email,
      Amount: amount.toString(),
      Timestamp: new Date(),
    });

    // Save to the database
    await dbTransaction.save();

    const subject = 'Your Gift Card Purchase Confirmation';
    const text = `Thank you for your purchase, Your gift card from ${brand} with ${formattedAmount} ETH is confirmed`;
    const html = `<h1>Gift card Purchase Confirmation</h1>
                  <p>Thank you for your purchase</p>
                  <p><strong>Brand: </strong>${brand}</p>
                  <p><strong>Amount: </strong>${formattedAmount} ETH
                  <p><strong>Transaction Hash: </strong> ${txResponse.hash}</p>
                  <p><strong>Gift Card Code:: </strong> ${giftCardCode}</p>`;

    await sendEmail(email, subject, text, html);

    // Send success response with the receipt
    res.status(200).json({
      message: `Successfully purchased ${brand} gift card!`,
      receipt: txReceipt,
    });
  } catch (error) {
    console.error('Error buying Gift Card:', error);

    // Send error response
    res
      .status(500)
      .json({ error: 'Transaction Failed', details: error.message });
  }
};
