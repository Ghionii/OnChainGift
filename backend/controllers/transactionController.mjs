import { purchaseGiftCard } from '../Service/Blockchain.mjs';
import GiftCardPurchase from '../model/giftCardModel.mjs';
import { sendEmail } from '../Service/emailService.mjs';

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

    // Call the purchaseGiftCard function
    const txResponse = await purchaseGiftCard(email, amount);

    // Wait for the transaction to be confirmed
    const txReceipt = await txResponse.wait();

    // Save the transaction details in MongoDB
    const dbTransaction = new GiftCardPurchase({
      TransactionHash: txResponse.hash,
      BuyerAddress: txResponse.from,
      RecipientEmail: email,
      Amount: amount.toString(),
      Timestamp: new Date(),
    });

    // Save to the database
    await dbTransaction.save();

    const subject = 'Your Gift Card Purchase Confirmation';
    const text = `Thank you for your purchase, Your gift card from ${brand} with ${amount} ETH is confirmed`;
    const html = `<h1>Gift card Purchase Confirmation</h1>
                  <p>Thank you for your purchase</p>
                  <p><strong>Amount:</strong>${amount} ETH
                  <p><strong>Transaction Hash:</strong> ${txResponse.hash}</p>`;

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
