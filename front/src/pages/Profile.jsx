import React, { useEffect, useState, useContext } from 'react';
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';

const Profile = () => {
  const { backendUrl } = useContext(ShopContext);
  const [user, setUser] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    setUser(currentUser);

    const fetchUserOrders = async () => {
      if (!currentUser) return;
      try {
        const response = await axios.get(`${backendUrl}/api/orders/user`, {
          params: { userEmail: currentUser.email },
        });
        if (response.data.success && Array.isArray(response.data.orders) && response.data.orders.length > 0) {
          setLastOrder(response.data.orders[response.data.orders.length - 1]);
        }
      } catch (error) {
        console.error('Error fetching user orders:', error.response?.data || error.message);
      }
    };

    fetchUserOrders();
  }, [backendUrl]);

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-10 text-gray-800">
      <div className="text-2xl pt-5">
        <Title text1="YOUR" text2="PROFILE" />
        <hr className="bg-gray-300 my-4" />
      </div>
      {user ? (
        <div className="flex flex-col gap-4">
          <p>
            <span className="font-medium">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user.email}
          </p>
          {user.phone && (
            <p>
              <span className="font-medium">Phone:</span> {user.phone}
            </p>
          )}
          <div className="mt-6">
            <p className="font-medium mb-2">Most Recent Delivery Address:</p>
            {lastOrder && lastOrder.deliveryInfo ? (
              <div className="border border-gray-300 rounded-lg p-4 text-sm">
                <div className="font-semibold mb-1">
                  {lastOrder.deliveryInfo.firstName} {lastOrder.deliveryInfo.lastName}
                </div>
                <div>
                  {lastOrder.deliveryInfo.street}
                </div>
                <div>
                  {lastOrder.deliveryInfo.city}, {lastOrder.deliveryInfo.state} {lastOrder.deliveryInfo.zipcode}
                </div>
                <div>
                  <span className="font-medium">Phone:</span> {lastOrder.deliveryInfo.phone}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {lastOrder.deliveryInfo.email}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">No previous orders found.</p>
            )}
          </div>
        </div>
      ) : (
        <p className="text-gray-500">No user information found.</p>
      )}

      {/* Website Highlights Section */}
      <div className="mt-10 border border-gray-300 rounded-lg p-6 bg-white">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Why Shop With Us?</h3>
        <ul className="list-disc pl-6 text-gray-700 space-y-1 text-sm">
          <li>
            <span className="font-semibold">Fast & Reliable Delivery:</span> Get your orders delivered quickly and safely, right to your doorstep.
          </li>
          <li>
            <span className="font-semibold">Premium Quality Products:</span> We handpick every item to ensure you get only the best.
          </li>
          <li>
            <span className="font-semibold">Secure Payments:</span> Multiple payment options including UPI and Cash on Delivery for your convenience.
          </li>
          <li>
            <span className="font-semibold">24/7 Customer Support:</span> Our team is always here to help you with any questions or issues.
          </li>
          <li>
            <span className="font-semibold">Exclusive Offers:</span> Enjoy special discounts and deals as a valued member!
          </li>
          <li>
            <span className="font-semibold">Easy Returns:</span> Hassle-free returns and exchanges for a worry-free shopping experience.
          </li>
        </ul>
        <div className="mt-4 text-gray-700 font-medium text-sm">
          Thank you for being a part of our community! We’re committed to making your shopping experience amazing.
        </div>
      </div>
    </div>
  );
};

export default Profile;