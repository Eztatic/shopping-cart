import { useState, useContext } from 'react'
import Styles from '/src/styles/CheckoutPage.module.css';
import CartContext from '/src/components/CartContext.jsx';
import CartStyles from '/src/styles/ShoppingCart.module.css';
import { MdCheckCircle } from "react-icons/md";

const CheckoutConfirmation = ({ isVisible }) => {
      const visibility = isVisible ? Styles.visible : '';

      return (
            <div className={`${Styles['checkout-confirmation']} ${visibility}`}>
                  <div>
                        <MdCheckCircle className={Styles['check-icon-1']} />
                        <h2>Order Completed</h2>
                  </div>
            </div>
      );
}

const Item = ({ imgURL, quantity, title, category, price }) => {
      return (
            <li className={`${CartStyles['cart-item']} ${Styles['list-item']}`}>
                  <div>
                        <img src={imgURL} alt="Item Image" />
                        <p className={CartStyles.quantity}>{quantity}</p>
                  </div>
                  <div>
                        <p>{title}</p>
                        <p>{category}</p>
                        <p>{`$${price}`}</p>
                  </div>
            </li>
      );
}

const OrderSummary = ({ cart }) => {
      return (
            <div className={Styles['order-summary']}>
                  <h2>Order Summary</h2>
                  <ul>
                        {cart.length === 0 ? <li>No Items Here</li> : null}
                        {
                              cart.map(({ id, imgURL, title, category, price, quantity }) => {
                                    return <Item
                                          key={id}
                                          id={id}
                                          imgURL={imgURL}
                                          title={title}
                                          category={category}
                                          price={(price * quantity).toFixed(2)}
                                          quantity={quantity} />;
                              })
                        }
                  </ul>
            </div>
      );
}

const FormCheckout = () => {
      return (
            <form onSubmit={(e) => e.preventDefault()} className={Styles['checkout-form']}>
                  <h2>Checkout Form</h2>
                  <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" placeholder="sample@xyz.com" />
                  </div>
                  <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Adam Peter" />
                  </div>
                  <div className={Styles.address}>
                        <label htmlFor="address">Address</label>
                        <input type="text" id="country" name="country" placeholder="Country" />
                        <input type="text" id="address" name="address" placeholder="Address" />
                        <div>
                              <input type="text" id="city" name="city" placeholder="City" />
                              <input type="number" id="postal" name="postal" placeholder="Postal Code/Zip" />
                        </div>
                        <input type="text" id="province" name="province" placeholder="State/Province/Region" />
                  </div>

                  <div>
                        <label htmlFor="payment">Payment</label>
                        <input type="text" id="payment" name="payment" placeholder="Card Number - MM/YY - CVC" />
                  </div>
            </form >
      );
}

const PaymentSummary = ({ cart, buttonHandler }) => {
      const isDisabled = cart.length === 0 ? Styles.disabled1 : null;

      return (
            <div className={Styles.payments}>
                  <p>Payment Summary</p>
                  <span>
                        <p>Discount</p>
                        <p>10%</p>
                  </span>
                  <span>
                        <p>Subtotal</p>
                        <p>$10.00</p>
                  </span>
                  <span>
                        <p>Total</p>
                        <p>$9.00</p>
                  </span>
                  <button onClick={buttonHandler} className={isDisabled}>Complete Order</button>
            </div>
      );
}

const CheckoutPage = () => {
      const [confirmation, setConfirmation] = useState(false);
      const { cartItems, clearCart } = useContext(CartContext);

      const buttonHandler = (e) => {
            e.preventDefault();
            clearCart();
            setConfirmation(true);
            setTimeout(() => setConfirmation(false), 3000);
      }

      return (
            <>
                  <CheckoutConfirmation isVisible={confirmation} />
                  <section className={Styles['checkout-page']}>
                        <OrderSummary cart={cartItems} />
                        <div>
                              <FormCheckout />
                              <PaymentSummary cart={cartItems} buttonHandler={buttonHandler} />
                        </div>
                  </section>
            </>
      );
}

export default CheckoutPage;