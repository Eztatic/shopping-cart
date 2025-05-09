import { useState } from 'react';
import CartContext from './CartContext';

const CartProvider = ({ children }) => {
      const [cartItems, setCartItems] = useState([]);

      const addToCart = (e, newItem) => {
            e.preventDefault();
            setCartItems(prevItems => [...prevItems, newItem]);
      }

      const removeFromCart = (e, id) => {
            e.preventDefault();
            setCartItems(prevItems => prevItems.filter((item) => item.id !== id))
      }

      const clearCart = () => setCartItems([]);

      return (
            <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
                  {children}
            </CartContext.Provider>
      );
}

export default CartProvider;