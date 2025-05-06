import { useEffect, useState } from 'react';

export const useFetchProducts = () => {
      const [products, setProducts] = useState([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(null);

      useEffect(() => {
            const controller = new AbortController();
            const signal = controller.signal;

            const fetchProducts = async () => {
                  try {
                        // Uncomment only to show that loading spinner is working.
                        // Don't uncomment if unit testing
                        // await new Promise(resolve => setTimeout(resolve, 2000));

                        const response = await fetch('https://fakestoreapi.com/products', {
                              mode: 'cors',
                              signal,
                        });

                        if (!response.ok) throw new Error('Server Error');
                        const data = await response.json();
                        setProducts(data);
                  } catch (err) {
                        if (err.name !== 'AbortError') {
                              setError(err);
                        }
                  } finally {
                        setLoading(false);
                  }
            };

            fetchProducts();
            return () => controller.abort();
      }, []);

      return { products, loading, error };
};