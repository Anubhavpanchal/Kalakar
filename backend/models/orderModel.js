import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  deliveryInfo: {
    type: Object,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'Order Placed',
  },
});

const orderModel = mongoose.models.order || mongoose.model('order', orderSchema);

export default orderModel;
