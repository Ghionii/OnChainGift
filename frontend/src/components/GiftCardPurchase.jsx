import { react, useState } from 'react';
import { giftCardPurchase } from '../blockchainService';

export const GiftCardForm = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await giftCardPurchase(email, amount);
      setMessage(data.message || 'Transaction Successful!');
    } catch (error) {
      setMessage('Error buying giftcard: ' + error.message);
    }
  };

  return (
    <div>
      <h2>Buy Gift Card</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount (ETH):</label>
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type='submit'>Buy Gift Card</button>
      </form>

      {/* Displaying message after submitting the form */}
      {message && <p>{message}</p>}
    </div>
  );
};
