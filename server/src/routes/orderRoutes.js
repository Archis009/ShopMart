const express = require('express');
const {
  createOrder,
  getUserOrders,
  getOrder,
  updateOrderStatus,
  getAllOrders
} = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getUserOrders);
router.get('/admin/all', authMiddleware, getAllOrders);
router.get('/:id', authMiddleware, getOrder);
router.patch('/:id', authMiddleware, updateOrderStatus);

module.exports = router;
