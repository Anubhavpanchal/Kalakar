import express from 'express';
import { saveOrder, getUserOrders, deleteOrder } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import { getAllUserCartOrders } from '../controllers/orderController.js';
import { updateOrderStatus } from '../controllers/orderController.js';
import { getOrdersForArtist } from "../controllers/orderController.js";


const orderRouter = express.Router();

// Save a new order
orderRouter.post('/save', saveOrder);

// Get orders for a specific user
orderRouter.get('/user', getUserOrders);

// Get all orders (admin only)
orderRouter.get('/all-user-cart-orders', adminAuth, getAllUserCartOrders);

// Delete an order (admin only)
orderRouter.delete('/delete/:id', adminAuth, deleteOrder);

// Get all orders for a specific artist's products
orderRouter.get("/artist/:artistId", getOrdersForArtist);


orderRouter.patch('/update-status/:id', updateOrderStatus);


export default orderRouter;