import { useState, useContext } from 'react';
import Styles from '/src/styles/ShoppingPage.module.css';
import { toTitleCase } from '/src/components/Utility.jsx';
import { ClipLoader } from "react-spinners";
import { MdError, MdCheckCircle } from "react-icons/md";
import { useFetchProducts } from '/src/components/useFetchProducts';
import CartContext from './CartContext';

const NetworkError = () => {
      return (
            <div className={Styles['network-error']}>
                  <p><MdError className={Styles['error-icon']} /> Network Request Timeout.</p>
                  <p>Try to refresh the page</p>
            </div>
      );
}

const CartConfirmation = ({ animationKey }) => {
      const animate = animationKey ? Styles.animate : "";

      return (
            <div key={animationKey} className={`${Styles['cart-confirmation']} ${animate}`}>
                  <p><MdCheckCircle className={Styles['check-icon']} />
                        Item has been added to cart
                  </p>
            </div>
      );
}

const ItemCard = ({ category, imgURL, title, price, notify }) => {
      const id = crypto.randomUUID();
      const [quantity, setQuantity] = useState(1);
      const itemDetails = { id, category, imgURL, title, price, quantity };
      const { addToCart } = useContext(CartContext);

      const decrement = () => {
            setQuantity(prev => (prev > 1 ? prev - 1 : 1));
      }

      const increment = () => {
            setQuantity(prev => (prev < 100 ? Number(prev) + 1 : 100));
      }

      const addToCartHandler = (e) => {
            notify();
            addToCart(e, itemDetails);
            setQuantity(1);
      }

      const onChangeHandler = (e) => {
            const value = e.target.value;

            if (value === '') {
                  setQuantity('');
                  return;
            }

            const numericValue = Number(value);

            if (isNaN(numericValue)) {
                  setQuantity(1);
                  return;
            }

            if (numericValue > 100) {
                  setQuantity(100);
                  return;
            }

            setQuantity(numericValue);
      }

      return (
            <div className={Styles.card}>
                  <p>{toTitleCase(category)}</p>
                  <div>
                        <img src={imgURL} alt="Product Image" />
                  </div>
                  <div className={Styles.title}>
                        <p>{title}</p>
                        <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)}</p>
                  </div>
                  <div className={Styles.quantity}>
                        <button type='button' onClick={decrement}>-</button>
                        <input
                              type="number"
                              value={quantity}
                              min={1}
                              max={100}
                              onChange={onChangeHandler}
                        />
                        <button type='button' onClick={increment}>+</button>
                  </div>
                  <button
                        className={`${quantity < 1 || quantity > 100 ? Styles.disabled : ''}`}
                        disabled={quantity < 1 || quantity > 100}
                        onClick={addToCartHandler}
                        aria-label={`Add ${title} to cart`}>
                        Add to cart
                  </button>
            </div >
      );
}

const ShoppingPage = () => {
      const { products, loading, error } = useFetchProducts();
      const [animateKey, setAnimateKey] = useState(0);

      const notify = () => {
            setAnimateKey(Date.now());
      }

      return (
            <>
                  <section className={Styles['shopping-page']}>
                        <h1>Products</h1>
                        {loading
                              && <ClipLoader color={"#006eff"} size={"64px"} />}

                        {error && <NetworkError />}

                        <div className={Styles.products}>
                              {products.map(({ id, category, image, title, price }) => (
                                    <ItemCard
                                          key={id}
                                          category={category}
                                          imgURL={image}
                                          title={title}
                                          price={price}
                                          notify={notify}
                                    />
                              ))}
                        </div>
                  </section>
                  <CartConfirmation animationKey={animateKey} />
            </>
      );
}

export default ShoppingPage;