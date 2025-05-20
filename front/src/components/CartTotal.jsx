import React from 'react';
import Title from './Title';
import { useNavigate } from 'react-router-dom';

const CartTotal = ({ currency, subtotal, shippingFee, onCheckout }) => {
  const navigate = useNavigate();

  // Calculate total price (subtotal + shipping fee)
  const calculateTotal = () => {
    return subtotal + shippingFee;
  };

  return (
    <div className="lg:w-2/2 w-full pt-7  justify-end " >
      <div className="text-2xl">
        <Title text1="YOUR" text2="CART" className="text-xl" />
      </div>
      <div className="flex justify-between pt-2">
        <span className="text-gray-600">Subtotal</span>
        <span className="font-medium">
          {currency}
          {subtotal.toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between pt-2">
        <span className="text-gray-600">Shipping Fee</span>
        <span className="font-medium">
          {currency}
          {shippingFee.toFixed(2)}
        </span>
      </div>
      <div className="flex justify-between border-t pt-2">
        <span className="text-gray-800 font-semibold">Total</span>
        <span className="font-semibold">
          {currency}
          {calculateTotal().toFixed(2)}
        </span>
      </div>
    </div>
  );
};

export default CartTotal;