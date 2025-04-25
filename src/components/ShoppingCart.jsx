import { useState, useContext } from 'react';
import { Link } from 'react-router';
import styles from '/src/styles/ShoppingCart.module.css';
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import CartContext from './CartContext';

const CartButton = ({ openHandler }) => {
      const cart = useContext(CartContext);

      return (
            <button className={styles['cart-button']} onClick={openHandler}>
                  <FaShoppingCart />
                  <p>{cart.length}</p>
            </button>
      );
}

const CartItem = ({ imgURL, title, category, price }) => {
      return (
            <li className={styles['cart-item']}>
                  <div>
                        <img src={imgURL} alt="Item Image" />
                  </div>
                  <div>
                        <p>{title}</p>
                        <p>{category}</p>
                        <p>{`$${price}`}</p>
                  </div>
                  <button><FaTimes /></button>
            </li>
      );
}

const ShoppingCart = () => {
      const [isOpen, setIsOpen] = useState(true);
      const cart = useContext(CartContext);

      return (
            <>
                  <CartButton openHandler={() => setIsOpen(false)} />
                  <aside className={`${styles['cart-panel']} ${!isOpen ? styles.open : styles.close}`}>
                        <h1>Your Cart</h1>
                        <hr />
                        <ul>
                              {cart.length === 0 ? <li>No Items Here</li> : null}
                              {
                                    cart.map(({ imgURL, title, category, price }) => {
                                          return <CartItem
                                                key={crypto.randomUUID()}
                                                imgURL={imgURL}
                                                title={title}
                                                category={category}
                                                price={price} />;
                                    })
                              }
                        </ul>
                        <hr />
                        <div>
                              <p>Number of Items: 0</p>
                              <p>Total: $00.00</p>
                        </div>
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