import '../styles/giftCards.css';
import hmImage from '../assets/h&m.jpeg';
import amazonImage from '../assets/Amazon.jpg';
import appleImage from '../assets/apple.jpg';
import { useNavigate } from 'react-router-dom';

export const GiftCards = () => {
  const giftCards = [
    { brand: 'Amazon', className: 'amazon-card', image: amazonImage },
    { brand: 'H&M', className: 'hm-card', image: hmImage },
    { brand: 'Apple', className: 'apple-card', image: appleImage },
  ];

  const navigate = useNavigate();

  const handleCardSelection = (brand) => {
    navigate('/giftcard/buy', { state: { brand } });
  };

  return (
    <div className='giftCardContainer'>
      {giftCards.map((card) => (
        <div
          key={card.brand}
          className={`gift-card ${card.className}`}
          onClick={() => handleCardSelection(card.brand)}
        >
          <img src={card.image} alt={card.brand} />
          <p>{card.brand} Gift Card 50 - 500$ </p>
        </div>
      ))}
    </div>
  );
};
