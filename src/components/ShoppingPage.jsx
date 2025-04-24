import { useState, useEffect } from 'react';
import styles from '/src/styles/ShoppingPage.module.css';

const ItemCard = ({ category, imgURL, title, price }) => {
      return (
            <div className={styles.card}>
                  <p>{category}</p>
                  <img src={imgURL} alt="Product Image" />
                  <div>
                        <p>{title}</p>
                        <p>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)}</p>
                  </div>
                  <button aria-label={`Add ${title} to cart`}>
                        Add to cart
                  </button>
            </div >
      );
}

const ShoppingPage = () => {
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
                              />
                        ))}
                  </div>
            </>
      );
}

export default ShoppingPage;