import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import BottomNav from './components/BottomNav';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import UsersPage from './pages/UsersPage';
import ReviewsPage from './pages/ReviewsPage';
import FavoritesPage from './pages/FavoritesPage';
import OrdersPage from './pages/OrdersPage';

function App() {
  return (
    <Router>
      <div className="App">
        {/* El contenido principal irá aquí */}
        <main style={{ paddingBottom: '60px' }}> {/* Asegura espacio para BottomNav */}
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            {/* Añadir ruta para la 6ta pestaña si se implementa */}
          </Routes>
        </main>
        <BottomNav />
      </div>
    </Router>
  );
}

export default App;
