
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import Home from './Home';
import Products from './Products';
import AddProduct from './AddProduct';
import ProductDetails from './ProductDetails';
import Cart from './Cart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/products" element={<Layout><Products /></Layout>} />
        <Route path="/products/:id" element={<Layout><ProductDetails /></Layout>} />
        <Route path="/add-product" element={<Layout><AddProduct /></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
