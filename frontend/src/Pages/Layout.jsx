import { NavLink, Outlet } from 'react-router-dom';
import '../styles/layout.css';

export const Layout = () => {
  return (
    <>
      <div className='wrapper-nav'>
        <header className='header'>
          <nav className='nav-right'>
            <ul className='nav-left'>
              <h1 className='nav-h1'>
                <NavLink to={'/'}> OnChainGift</NavLink>
              </h1>
              <>
                <li>
                  <NavLink to={'/giftcards'}>Gift Cards</NavLink>
                </li>
                <li>
                  <NavLink to={'/privacy'}>Privacy Policy</NavLink>
                </li>
              </>
            </ul>
          </nav>
        </header>
      </div>
      <div>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};
