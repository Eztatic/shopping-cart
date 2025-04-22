import { useState, useEffect } from 'react';

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
                  <ul>
                        {products.map((product) => {
                              return <li key={product.id}>{product.title}</li>
                        })}
                  </ul>
            </>
      );
}

export default ShoppingPage;