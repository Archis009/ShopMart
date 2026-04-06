const express = require('express');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/', authMiddleware, createProduct);
router.patch('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

module.exports = router;
