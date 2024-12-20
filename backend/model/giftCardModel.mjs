import mongoose from 'mongoose';

const giftCardSchema = new mongoose.Schema({
  BuyerAddress: { type: String, required: true },
  RecipientEmail: { type: String, required: true },
  TransactionHash: { type: String, required: true, unique: true },
  Timestamp: { type: Date, default: Date.now },
  Amount: { type: String, required: true },
});

const GiftCardPurchase = mongoose.model('GiftCardPurchase', giftCardSchema);

export default GiftCardPurchase;
