import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from '../productList/ProductList';
import ProductDetail from '../productDetails/ProductDetails';

export default function App() {
    return (
        <Router>
            <div className="App">
                <header className="App-header">
                </header>

                <Routes>
                    <Route path="/" element={<ProductList />} />
                    <Route path="/products/:id1/:id" element={<ProductDetail />} />
                </Routes>
            </div>
        </Router>
    );
}