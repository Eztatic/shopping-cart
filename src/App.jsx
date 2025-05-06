import { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/Homepage';
import ShoppingPage from './components/ShoppingPage';
import CheckoutPage from './components/CheckoutPage';
import ShoppingCart from './components/ShoppingCart';
import UnknownPage from './components/UnknownPage';
import CartContext from './components/CartContext';
import '/src/styles/App.css';

function Layout({ cartItems, removeFromCart }) {
  return (
    <CartContext.Provider value={cartItems}>
      <ShoppingCart removeHandler={removeFromCart} />
      <Header />
      <Outlet />
      <Footer />
    </CartContext.Provider>
  );
}

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

  const clearCart = () => setCartItems([]);

  return (

    <Routes>
      <Route element={
        <Layout
          cartItems={cartItems}
          removeFromCart={removeFromCart} />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/ShoppingPage"
          element={<ShoppingPage addHandler={addToCart} />} />
        <Route
          path="/CheckoutPage"
          element={<CheckoutPage resetCartHandler={clearCart} />} />
      </Route>

      <Route path="*" element={<UnknownPage />} />
    </Routes>

  )
}

export default App
