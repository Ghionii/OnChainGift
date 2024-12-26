import { NavLink } from 'react-router-dom';
import '../styles/landingPage.css';
export const HomePage = () => {
  return (
    <div className='container'>
      <div className='landing-page'>
        <h1>Welcome To OnChainGift</h1>
        <h2>Your easy way to spend crypto</h2>
        <div>
          Welcome to OnChainGift Discover the simplest way to purchase and send
          gift cards using cryptocurrency. With OnChainGift, you can choose from
          a variety of popular brands, customize the amount, and send gift cards
          seamlessly—all powered by secure blockchain technology.
          <p>
            🌟 Why Choose Us?
            <ul> Transparent and fast transactions with Ethereum. </ul>
            <ul> A wide selection of gift cards for your favorite brands.</ul>
            <ul>
              Easy to use—just select, pay, and send. Start gifting the modern
              way today!
            </ul>
          </p>
          <NavLink to={'/giftcards'}> Our Gift Cards</NavLink>
        </div>
      </div>
    </div>
  );
};
