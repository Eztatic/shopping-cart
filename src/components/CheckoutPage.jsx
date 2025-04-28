import { useContext } from 'react'
import styles from '/src/styles/CheckoutPage.module.css';
import CartContext from '/src/components/CartContext.jsx';
import CartStyles from '/src/styles/ShoppingCart.module.css'

const Item = ({ imgURL, quantity, title, category, price }) => {
      return (
            <li className={`${CartStyles['cart-item']} ${styles['list-item']}`}>
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

const OrderSummary = () => {
      const cart = useContext(CartContext);

      return (
            <div className={styles['order-summary']}>
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
            <form onSubmit={(e) => e.preventDefault()} className={styles['checkout-form']}>
                  <h2>Checkout Form</h2>
                  <div>
                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" name="email" placeholder="sample@xyz.com" />
                  </div>
                  <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" placeholder="Adam Peter" />
                  </div>
                  <div className={styles.address}>
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

const PaymentSummary = () => {
      return (
            <div className={styles.payments}>
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
                  <button>Complete Order</button>
            </div>
      );
}

const CheckoutPage = () => {
      return (
            <section className={styles['checkout-page']}>
                  <OrderSummary />
                  <div>
                        <FormCheckout />
                        <PaymentSummary />
                  </div>
            </section>
      );
}

export default CheckoutPage;