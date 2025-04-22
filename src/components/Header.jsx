import { Link } from 'react-router';
import HomePage from './Homepage.jsx';
import ShoppingPage from './ShoppingPage.jsx'

const Header = () => {
      return (
            <header>
                  <h1>Header</h1>
                  <nav>
                        <ul>
                              <li>
                                    <Link to={'/'}>Homepage</Link>
                              </li>
                              <li>
                                    <Link to={'/ShoppingPage'}>Shop</Link>
                              </li>
                              <li>
                                    <Link to={'/CheckoutPage'}>Checkout</Link>
                              </li>
                        </ul>
                  </nav>
            </header>
      );
}

export default Header;