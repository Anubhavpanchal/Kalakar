import React, { useEffect, useState, useContext } from 'react';
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { backendUrl } = useContext(ShopContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));

      if (!currentUser) {
        toast.error('You need to log in to view your orders.');
        navigate('/');
        return;
      }

      try {
        const response = await axios.get(`${backendUrl}/api/orders/user`, {
          params: { userEmail: currentUser.email },
        });

        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          toast.error(response.data.message || 'Failed to fetch orders.');
        }
      } catch (error) {
        console.error('Error fetching orders:', error.response?.data || error.message);
        toast.error('An error occurred while fetching orders.');
      }
    };

    fetchOrders();
  }, [backendUrl, navigate]);

  return (
    <div className="flex flex-col w-full items-start gap-4 p-4  min-h-[80vh]">
      <div className="text-2xl pt-5 w-full">
        <Title text1="YOUR" text2="ORDERS" />
        <hr className="bg-gray-300 my-4" />
      </div>
      <div className="flex flex-col gap-2 w-full">
        {/* Table header for desktop */}
        <div className="hidden md:grid grid-cols-[1fr_1fr_1fr_2fr_2fr] items-center py-2 px-4 border bg-gray-200 text-sm font-semibold text-gray-700 rounded-lg">
          <b>Date</b>
          <b>Total</b>
          <b>Payment</b>
          <b>Items</b>
          <b>Delivery Info</b>
        </div>
        {/* Table body for desktop */}
        <div className="hidden md:flex flex-col gap-2 w-full">
          {orders.length === 0 ? (
            <p className="text-gray-500 mt-4">No orders found.</p>
          ) : (
            orders.map((order, index) => (
              <div
                key={order._id || index}
                className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_2fr_2fr] items-center py-2 px-4 border bg-white text-sm rounded-lg shadow-sm hover:shadow-md transition duration-300 mb-2"
              >
                <div>
                  {order.date
                    ? new Date(order.date).toLocaleDateString()
                    : 'N/A'}
                </div>
                <div>₹{order.total ? Number(order.total).toFixed(2) : "0.00"}</div>
                <div>{order.paymentMethod || 'N/A'}</div>
                <div>
                  <ul>
                    {Array.isArray(order.items) && order.items.length > 0 ? (
                      order.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          {item.name} - {item.quantity} x ₹
                          {item.price ? Number(item.price).toFixed(2) : "0.00"}
                        </li>
                      ))
                    ) : (
                      <li>No items found.</li>
                    )}
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
              </div>
            ))
          )}
        </div>
        {/* Mobile cards */}
        <div className="md:hidden flex flex-col gap-4 w-full">
          {orders.length === 0 ? (
            <p className="text-gray-500 mt-4">No orders found.</p>
          ) : (
            orders.map((order, index) => (
              <div
                key={order._id || index}
                className="border bg-white rounded-lg shadow-sm p-4 flex flex-col gap-2"
              >
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Date:</span>
                  <span>
                    {order.date
                      ? new Date(order.date).toLocaleDateString()
                      : 'N/A'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Total:</span>
                  <span>₹{order.total ? Number(order.total).toFixed(2) : "0.00"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">Payment:</span>
                  <span>{order.paymentMethod || 'N/A'}</span>
                </div>
                <div>
                  <span className="font-semibold text-sm">Items:</span>
                  <ul className="list-disc list-inside text-xs text-gray-600 ml-2">
                    {Array.isArray(order.items) && order.items.length > 0 ? (
                      order.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          {item.name} - {item.quantity} x ₹
                          {item.price ? Number(item.price).toFixed(2) : "0.00"}
                        </li>
                      ))
                    ) : (
                      <li>No items found.</li>
                    )}
                  </ul>
                </div>
                {order.deliveryInfo && (
                  <div className="mt-2 text-xs text-gray-600">
                    <span className="font-semibold">Delivery Info:</span>
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;