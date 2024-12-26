import React, { useEffect, useState } from 'react';
import { giftCardPurchase, fetchEthPrice } from '../blockchainService';
import { useLocation } from 'react-router-dom';

export const GiftCardForm = () => {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [ethPrice, setEthPrice] = useState(0);
  const [ethAmount, setEthAmount] = useState(0);

  const location = useLocation();
  const selectedBrand = location.state?.brand || 'unknown';

  const EtherPrice = async () => {
    try {
      const data = await fetchEthPrice();
      setEthPrice(data.ethereum.usd);
    } catch (error) {
      console.error('Error fetching ETH price', error);
    }
  };

  useEffect(() => {
    EtherPrice();
  }, []);

  const handleAmountChange = (e) => {
    const selectedAmount = e.target.value;
    setAmount(selectedAmount);

    if (ethPrice && selectedAmount) {
      const convertedETh = selectedAmount / ethPrice;
      setEthAmount(convertedETh);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await giftCardPurchase(email, ethAmount, selectedBrand);
      setMessage(data.message || 'Transaction Successful!');
    } catch (error) {
      setMessage('Error buying giftcard: ' + error.message);
    }
  };

  return (
    <div>
      <h2>{selectedBrand} Gift Card</h2>
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
          <label>Amount:</label>
          <select
            name='Amount'
            id='amount'
            onChange={(e) => handleAmountChange(e)}
            required
          >
            <option value=''>Select amount</option>
            <option value='50'>50$</option>
            <option value='100'>100$</option>
            <option value='200'>200$</option>
            <option value='300'>300$</option>
            <option value='400'>400$</option>
            <option value='500'>500$</option>
          </select>
        </div>
        <div>
          <p>Converted Amount: {ethAmount.toFixed(6)} ETH</p>
        </div>
        <button type='submit'>Buy Gift Card</button>

        <div>
          <input type='checkbox' required />
          <label>
            I agree to the terms of our privacy policy.{' '}
            <a href='/privacy'>Privacy Policy</a>
          </label>
        </div>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
};
