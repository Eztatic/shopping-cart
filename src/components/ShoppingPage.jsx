import { useState, useEffect } from 'react';
import styles from '/src/styles/ShoppingPage.module.css';

const toTitleCase = (str) => {
      return str
            .toLowerCase()
            .replace(/\w\S*/g, word =>
                  word.charAt(0).toUpperCase() + word.slice(1)
            );
}


const ItemCard = ({ category, imgURL, title, price, handler }) => {
      const id = crypto.randomUUID();
      const [quantity, setQuantity] = useState(1);
      const itemDetails = { id, category, imgURL, title, price, quantity };

      const decrement = () => {
            setQuantity(prev => (prev > 1 ? prev - 1 : 1));
      }

      const increment = () => {
            setQuantity(prev => (prev < 100 ? Number(prev) + 1 : 100));
      }

      const addToCartHandler = (e) => {
            handler(e, itemDetails);
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
            <div className={styles.card}>
                  <p>{toTitleCase(category)}</p>
                  <img src={imgURL} alt="Product Image" />
                  <div className={styles.title}>
                        <p>{title}</p>
                        <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)}</p>
                  </div>
                  <div className={styles.quantity}>
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
                        className={`${quantity < 1 || quantity > 100 ? styles.disabled : ''}`}
                        disabled={quantity < 1 || quantity > 100}
                        onClick={addToCartHandler}
                        aria-label={`Add ${title} to cart`}>
                        Add to cart
                  </button>
            </div >
      );
}

const ShoppingPage = ({ addHandler }) => {
      const [products, setProducts] = useState([]);
      const [error, setError] = useState(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
            const controller = new AbortController();
            const signal = controller.signal;

            const fetchProducts = async () => {
                  try {
                        const response = await fetch('https://fakestoreapi.com/products', {
                              mode: "cors",
                              signal
                        });

                        if (response.status >= 400) throw new Error("Server Error");

                        const data = await response.json();
                        setProducts(data);
                  } catch (error) {
                        if (error.name !== 'AbortError') {
                              setError(error);
                        }
                  } finally {
                        setLoading(false);
                  }
            }

            fetchProducts();

            return () => controller.abort();
      }, [])

      return (
            <>
                  <h1>Shopping Page</h1>
                  <p>List of Products</p>
                  {loading && <p>Loading...</p>}
                  {error && <p>Network Error</p>}
                  <div className={styles.products}>
                        {products.map(({ id, category, image, title, price }) => (
                              <ItemCard
                                    key={id}
                                    category={category}
                                    imgURL={image}
                                    title={title}
                                    price={price}
                                    handler={addHandler}
                              />
                        ))}
                  </div>
            </>
      );
}

export default ShoppingPage;