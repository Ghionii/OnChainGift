import GiftCardPurchase from '../model/giftCardModel.mjs';

export const addGiftCardPurschase = async (req, res) => {
  const {
    TransactionID,
    BuyerAddress,
    RecipientEmail,
    TransactionHash,
    Amount,
  } = req.body;

  console.log('Recieved Data', req.body);

  try {
    const purchase = new GiftCardPurchase({
      TransactionID,
      BuyerAddress,
      RecipientEmail,
      TransactionHash,
      Amount,
    });

    const savedPurchase = await purchase.save();

    res.status(201).json({
      message: 'Gift card purschase saved successfully!',
      savedPurchase,
    });
  } catch (error) {
    console.error('Error saving gift card purschase', error.message);
  }
};
