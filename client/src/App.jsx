import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './utils/AuthContext';
import { CartProvider } from './utils/CartContext';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Cart from './pages/Cart';
import './App.css';

function AppContent() {
  const { user } = React.useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/products" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/products" /> : <Register />}
        />
        <Route path="/products" element={<Products />} />
        <Route
          path="/cart"
          element={user ? <Cart /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
