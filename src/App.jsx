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
import CartProvider from './components/CartProvider';
import '/src/styles/App.css';

function Layout() {
  return (
    <CartProvider>
      <ShoppingCart />
      <Header />
      <Outlet />
      <Footer />
    </CartProvider>
  );
}

function App() {
  return (
    <Routes>
      <Route element={
        <Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/ShoppingPage"
          element={<ShoppingPage />} />
        <Route
          path="/CheckoutPage"
          element={<CheckoutPage />} />
      </Route>

      <Route path="*" element={<UnknownPage />} />
    </Routes>

  )
}

export default App
