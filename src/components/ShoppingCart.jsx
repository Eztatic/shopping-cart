import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import styles from '/src/styles/ShoppingCart.module.css';
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import { calculatePrice, calculateNumberOfItems } from "./Utility.jsx";
import CartContext from './CartContext';

const CartButton = ({ openHandler }) => {
      const { cartItems } = useContext(CartContext);

      return (
            <button className={styles['cart-button']} onClick={openHandler}>
                  <FaShoppingCart />
                  <p>{calculateNumberOfItems(cartItems)}</p>
            </button>
      );
}

const CartItem = (
      { id, imgURL, title, category, price, quantity, handler }) => {
      return (
            <li className={styles['cart-item']}>
                  <div>
                        <img src={imgURL} alt="Item Image" />
                        <p className={styles.quantity}>{quantity}</p>
                  </div>
                  <div>
                        <p>{title}</p>
                        <p>{category}</p>
                        <p>{`$${price}`}</p>
                  </div>
                  <button onClick={(e) => handler(e, id)}><FaTimes /></button>
            </li>
      );
}

const ShoppingCart = () => {
      const [isOpen, setIsOpen] = useState(true);
      const { cartItems, removeFromCart } = useContext(CartContext);

      return (
            <>
                  <CartButton openHandler={() => setIsOpen(false)} />
                  <aside className={`${styles['cart-panel']} ${!isOpen ? styles.open : styles.close}`}>
                        <h1>Your Cart</h1>
                        <hr />
                        <ul>
                              {cartItems.length === 0 ? <li>No Items Here</li> : null}
                              {
                                    cartItems.map(({ id, imgURL, title, category, price, quantity }) => {
                                          return <CartItem
                                                key={id}
                                                id={id}
                                                imgURL={imgURL}
                                                title={title}
                                                category={category}
                                                price={(price * quantity).toFixed(2)}
                                                quantity={quantity}
                                                handler={removeFromCart} />;
                                    })
                              }
                        </ul>
                        <hr />
                        <div>
                              <p>Number of Items: {calculateNumberOfItems(cartItems)}</p>
                              <p>Total: {calculatePrice(cartItems)}</p>
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