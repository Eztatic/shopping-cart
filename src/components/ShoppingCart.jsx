import { useState, useContext } from 'react';
import { Link } from 'react-router';
import styles from '/src/styles/ShoppingCart.module.css';
import { FaShoppingCart, FaTimes } from "react-icons/fa";
import CartContext from './CartContext';

const calculatePrice = (cartItems) => {
      const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0)
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice);
}

const CartButton = ({ openHandler }) => {
      const cart = useContext(CartContext);

      return (
            <button className={styles['cart-button']} onClick={openHandler}>
                  <FaShoppingCart />
                  <p>{cart.length}</p>
            </button>
      );
}

const CartItem = ({ id, imgURL, title, category, price, handler }) => {
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
                  <button onClick={(e) => handler(e, id)}><FaTimes /></button>
            </li>
      );
}

const ShoppingCart = ({ removeHandler }) => {
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
                                    cart.map(({ id, imgURL, title, category, price }) => {
                                          return <CartItem
                                                key={id}
                                                id={id}
                                                imgURL={imgURL}
                                                title={title}
                                                category={category}
                                                price={price}
                                                handler={removeHandler} />;
                                    })
                              }
                        </ul>
                        <hr />
                        <div>
                              <p>Number of Items: {cart.length}</p>
                              <p>Total: $ {calculatePrice(cart)}</p>
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