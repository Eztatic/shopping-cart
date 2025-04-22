import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router';
import Header from './components/Header.jsx';
import HomePage from './components/Homepage.jsx';
import ShoppingPage from './components/ShoppingPage.jsx';
import CheckoutPage from './components/CheckoutPage.jsx';
import ShoppingCart from './components/ShoppingCart.jsx';
import Footer from './components/Footer.jsx'
import './App.css';

function App() {
  return (
    <>
      <Header />
      {/* <ShoppingCart /> */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/ShoppingPage'
          element={<ShoppingPage />}
        />
        <Route
          path='/CheckoutPage'
          element={<CheckoutPage />}
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App
