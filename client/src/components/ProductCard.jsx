import React, { useContext } from 'react';
import { CartContext } from '../utils/CartContext';
import { useNavigate } from 'react-router-dom';
import '../styles/product-card.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="product-card">
      {product.image && <img src={product.image} alt={product.name} />}
      <h3>{product.name}</h3>
      <p className="description">{product.description}</p>
      <p className="price">${product.price}</p>
      <p className={`stock ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
        Stock: {product.stock}
      </p>
      <button
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className="add-to-cart-btn"
      >
        {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  );
};

export default ProductCard;
