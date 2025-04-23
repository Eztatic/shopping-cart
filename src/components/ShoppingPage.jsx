import { useState, useEffect } from 'react';
import styles from '/src/styles/ShoppingPage.module.css';



const ItemCard = ({ id, category, imgURL, title, price }) => {
      return (
            <div key={id} className={styles.card}>
                  <p>{category}</p>
                  <img src={imgURL} alt="Product Image" />
                  <div>
                        <p>{title}</p>
                        <p>{price}</p>
                  </div>
                  <button>Add to cart</button>
            </div>
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
                        {products.map((product) => {
                              return <ItemCard
                                    id={product.id}
                                    category={product.category}
                                    imgURL={product.image}
                                    title={product.title}
                                    price={`$${product.price}`} />
                        })}
                  </div>
            </>
      );
}

export default ShoppingPage;