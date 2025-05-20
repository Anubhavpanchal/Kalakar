import orderModel from '../models/orderModel.js';
import userModel from '../models/userModel.js';
import productModel from '../models/productModel.js'; // Required for artist-related queries

// Save a new order
const saveOrder = async (req, res) => {
  try {
    const { userEmail, items, total, deliveryInfo, paymentMethod } = req.body;

    if (!userEmail || !items || !total || !deliveryInfo || !paymentMethod) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Create a new order object for user's cart
    const newOrder = {
      items,
      total,
      deliveryInfo,
      paymentMethod,
      date: Date.now(),
    };

    // Save to user's cart
    const user = await userModel.findOneAndUpdate(
      { email: userEmail },
      { $push: { cart: newOrder } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    // Save to order collection (for admin)
    const dbOrder = new orderModel({
      userEmail,
      items,
      total,
      deliveryInfo,
      paymentMethod,
      date: Date.now(),
    });

    await dbOrder.save();

    res.status(201).json({ success: true, message: 'Order saved successfully.', user });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// Get orders for a specific user
const getUserOrders = async (req, res) => {
  try {
    const { userEmail } = req.query;

    if (!userEmail) {
      return res.status(400).json({ success: false, message: 'User email is required.' });
    }

    const user = await userModel.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.status(200).json({ success: true, orders: user.cart });
  } catch (error) {
    console.error('Error fetching user orders:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// Get all orders from orderModel (admin)
const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching all orders:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// Get all user cart orders (admin)
const getAllUserCartOrders = async (req, res) => {
  try {
    const users = await userModel.find({}, { email: 1, cart: 1, _id: 0 });

    const allCartOrders = users.flatMap(user =>
      (user.cart || []).map(order => ({
        userEmail: user.email,
        ...(order._doc || order) // handles both Mongoose docs and plain objects
      }))
    );

    res.status(200).json({ success: true, orders: allCartOrders });
  } catch (error) {
    console.error('Error fetching all user cart orders:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// Delete an order (admin)
const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await orderModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    res.json({ success: true, message: 'Order deleted.' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// Get all orders for a specific artist's products
const getOrdersForArtist = async (req, res) => {
  try {
    const { artistId } = req.params;

    const orders = await orderModel.find({
      "items.artistId": artistId,
    });

    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error in getOrdersForArtist:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// Update order status (admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await orderModel.findByIdAndUpdate(id, { status }, { new: true });

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    res.json({ success: true, order });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

export {
  saveOrder,
  getUserOrders,
  getAllOrders,
  getAllUserCartOrders,
  deleteOrder,
  getOrdersForArtist,
  updateOrderStatus,
};
