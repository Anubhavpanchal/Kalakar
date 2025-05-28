import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import navigate
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateCart } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const shippingFee = 100; // Fixed shipping fee
  const navigate = useNavigate(); // Initialize navigate

  // Calculate cart data based on cartItems
  useEffect(() => {
    const tempData = [];
    for (const productId in cartItems) {
      const product = products.find((item) => item._id === productId);
      if (product && cartItems[productId] > 0) {
        tempData.push({
          ...product,
          quantity: cartItems[productId],
        });
      }
    }
    setCartData(tempData);
  }, [cartItems, products]);

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cartData.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="px-4 sm:px-8 lg:px-16 py-10 text-gray-800 mt-10">
      {/* Cart Section */}
      <div className="text-2xl pt-5">
        <Title text1="YOUR" text2="CART" />
        <hr className="bg-gray-300 my-4" />
      </div>

      {cartData.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Cart Items */}
          <div className="flex-1 flex flex-col gap-6">
            {cartData.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b pb-4"
              >
                {/* Product Image */}
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />

                {/* Product Name */}
                <div className="flex-1 px-4">
                  <h2 className="text-lg font-medium">{item.name}</h2>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4">
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => updateCart(item._id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-2 py-1 border rounded"
                    onClick={() => updateCart(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                {/* Remove Button */}
                <button
                  className="text-red-500 hover:underline ml-5"
                  onClick={() => updateCart(item._id, 0)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

       
        </div>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}<div className='flex justify-end text-right ml-auto lg:w-1/2'>
   {/* Cart Totals */}
          <CartTotal
            currency={currency}
            subtotal={calculateSubtotal()}
            shippingFee={shippingFee}
          /> </div>
          <div className='w-full text-end '>
 {/* Proceed to Checkout Button */}
 {cartData.length > 0 && (
        <button
          className="w-1/3 bg-black text-white py-2 hover:bg-gray-800 transition duration-300 mt-2 pt-4 items-end"
          onClick={() => navigate('/place-orders')} // Navigate to place-orders
        >
          PROCEED TO CHECKOUT
        </button>
      )}
     
          </div>
     
    </div>
  );
};

export default Cart;