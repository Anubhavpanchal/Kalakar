import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const statusOptions = [
  'Order Placed',
  'Working',
  'Packing',
  'Out for Delivery',
  'Delivered',
];

const ArtistOrders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState({});
  const [loading, setLoading] = useState(true);

  // Get artistId from localStorage
  const artistUser = localStorage.getItem('artistUser');
  const artistId = artistUser ? JSON.parse(artistUser).id : '';

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${backendUrl}/api/orders/artist/${artistId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data.orders || []);
        // Initialize status for each order (default: Order Placed)
        const initialStatus = {};
        (res.data.orders || []).forEach(order => {
          initialStatus[order._id || order.userEmail + order.date] = 'Order Placed';
        });
        setOrderStatus(initialStatus);
      } catch (err) {
        setOrders([]);
        toast.error('Failed to fetch orders.');
      }
      setLoading(false);
    };
    if (artistId && token) fetchOrders();
  }, [artistId, token]);

  const handleStatusChange = (orderKey, value) => {
  setOrderStatus(prev => ({
    ...prev,
    [orderKey]: value,
  }));
  toast.success('Order status updated!');
};

  return (
    <div className="flex flex-col w-full items-start gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <p className="text-lg font-semibold text-gray-700 mb-2">Orders for Your Artworks</p>
      <div className="flex flex-col gap-2 w-full">
        {/* Table header */}
        <div className="hidden md:grid grid-cols-[1.5fr_1fr_1fr_1fr_2fr_2fr_1fr] items-center py-2 px-4 border bg-gray-200 text-sm font-semibold text-gray-700 rounded-lg">
          <b>User Email</b>
          <b>Total</b>
          <b>Payment</b>
          <b>Date</b>
          <b>Items</b>
          <b className="text-start">Delivery Info</b>
          <b className="text-center">Status</b>
        </div>
        {loading ? (
          <p className="text-gray-500 mt-4">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500 mt-4">No orders found for your artworks.</p>
        ) : (
          orders.map((order, idx) => {
            const orderKey = order._id || order.userEmail + order.date;
            // Only show items for this artist
            const artistItems = order.items.filter(item => item.artistId === artistId);
            if (artistItems.length === 0) return null;
            return (
              <div
                key={orderKey}
                className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr_2fr_2fr_1fr] items-center py-2 px-4 border bg-white text-sm rounded-lg shadow-sm hover:shadow-md transition duration-300 mb-2"
              >
                <div className="truncate">{order.userEmail}</div>
                <div>₹{order.total}</div>
                <div>{order.paymentMethod}</div>
                <div>
                  {order.date ? new Date(order.date).toLocaleDateString() : 'N/A'}
                </div>
                <div>
                  <ul>
                    {artistItems.map((item, idx) => (
                      <li key={idx}>
                        {item.name} x {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  {order.deliveryInfo && (
                    <div>
                      <div>
                        {order.deliveryInfo.firstName} {order.deliveryInfo.lastName}
                      </div>
                      <div>
                        {order.deliveryInfo.street}, {order.deliveryInfo.city}, {order.deliveryInfo.state} {order.deliveryInfo.zipcode}
                      </div>
                      <div>Phone: {order.deliveryInfo.phone}</div>
                      <div>Email: {order.deliveryInfo.email}</div>
                    </div>
                  )}
                </div>
                <div className="flex justify-center">
                  <select
                    className="border border-gray-400 rounded px-2 py-1 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition text-gray-700"
                    value={orderStatus[orderKey] || 'Order Placed'}
                    onChange={e => handleStatusChange(orderKey, e.target.value)}
                  >
                    {statusOptions.map(status => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ArtistOrders;