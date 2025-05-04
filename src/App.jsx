import { useState } from 'react';
import { Routes, Route } from 'react-router';
import Header from './components/Header.jsx';
import HomePage from './components/Homepage.jsx';
import ShoppingPage from './components/ShoppingPage.jsx';
import CheckoutPage from './components/CheckoutPage.jsx';
import ShoppingCart from './components/ShoppingCart.jsx';
import Footer from './components/Footer.jsx'
import CartContext from './components/CartContext.jsx'
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (e, newItem) => {
    e.preventDefault();
    setCartItems(prevItems => [...prevItems, newItem]);
  }

  const removeFromCart = (e, id) => {
    e.preventDefault();
    setCartItems(prevItems => prevItems.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCartItems([]);
  }

  return (
    <>
      <CartContext.Provider value={cartItems}>
        <ShoppingCart removeHandler={removeFromCart} />
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route
            path='/ShoppingPage'
            element={<ShoppingPage addHandler={addToCart} />}
          />
          <Route
            path='/CheckoutPage'
            element={<CheckoutPage resetCartHandler={clearCart} />}
          />
        </Routes>
        <Footer />
      </CartContext.Provider>
    </>
  )
}

export default App
