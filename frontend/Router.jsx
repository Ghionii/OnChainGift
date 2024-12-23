import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from './src/Pages/HomePage';
import { GiftCardForm } from './src/components/GiftCardPurchase';
import { GiftCards } from './src/Pages/GiftCards.jsx';
import { Layout } from './src/Pages/Layout.jsx';

export const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },

      {
        path: '/giftcards',
        element: <GiftCards />,
      },

      {
        path: '/giftcard/buy',
        element: <GiftCardForm />,
      },
    ],
  },
]);
