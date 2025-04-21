import { useState } from 'react';
import { Routes, Route } from 'react-router';
import Header from './components/Header.jsx';
import HomePage from './components/Homepage.jsx';
import ShoppingPage from './components/ShoppingPage.jsx'
import Footer from './components/Footer.jsx'
import './App.css';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route
          path='/ShoppingPage'
          element={<ShoppingPage />}
        />
      </Routes>
      <Footer />
    </>
  )
}

export default App
