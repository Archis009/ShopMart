import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../utils/AuthContext';
import '../styles/navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          ShopMart
        </Link>
        <div className="nav-links">
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
          {user ? (
            <>
              <span>Welcome, {user.name}</span>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
