import { useState } from 'react';
import { Link } from 'react-router';
import styles from '/src/styles/ShoppingCart.module.css';
import { FaShoppingCart } from "react-icons/fa";

const CartButton = ({ openHandler }) => {
      return (
            <button className={styles['cart-button']} onClick={openHandler}>
                  <FaShoppingCart />
                  <p>0</p>
            </button>
      );
}

const CartItem = ({ imgURL, title, category, price }) => {
      return (
            <li key={crypto.randomUUID()}>
                  <img src={imgURL} alt="Item Image" />
                  <div>
                        <p>{title}</p>
                        <p>{category}</p>
                        <p>{`$${price}`}</p>
                  </div>
                  <button>X</button>
            </li>
      );
}

const ShoppingCart = () => {
      const [isOpen, setIsOpen] = useState(false);

      return (
            <>
                  <CartButton openHandler={() => setIsOpen(false)} />
                  <aside className={`${styles['cart-panel']} ${!isOpen ? styles.open : styles.close}`}>
                        <h1>Your Cart</h1>
                        <hr />
                        <ul>
                              <li>Your cart is empty</li>
                        </ul>
                        <div>
                              <Link to={'/CheckoutPage'} className={styles['checkout-button']}>Checkout</Link>
                              <button onClick={() => {
                                    setIsOpen(true);
                              }}>Close</button>
                        </div>
                  </aside>
            </>
      );
}

export default ShoppingCart;