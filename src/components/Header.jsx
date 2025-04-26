import { useContext } from 'react'
import { Link } from 'react-router';
import CartContext from './CartContext'
import Styles from '/src/styles/Header.module.css';


const Header = () => {
      const cart = useContext(CartContext);
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
                                    <Link to={'/CheckoutPage'}>
                                    Checkout
                                    <p className={Styles.items}>{cart.length}</p>
                                    </Link>
                              </li>
                        </ul>
                  </nav>
            </header>
      );
}

export default Header;