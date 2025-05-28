import React, { useContext, useState } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { ShopContext } from '../context/ShopContext';
import upiImage from '../assets/upi_image.jpg';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrders = () => {
  const { cartItems, products, currency, backendUrl, clearCart } = useContext(ShopContext);
  const [deliveryInfo, setDeliveryInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [errors, setErrors] = useState({});
  const shippingFee = 100;
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  // Ensure artistId is included in each cart item
  const cartData = Object.keys(cartItems)
    .map((productId) => {
      const product = products.find((item) => item._id === productId);
      return product
        ? { ...product, quantity: cartItems[productId], artistId: product.artistId }
        : null;
    })
    .filter((item) => item !== null);

  const calculateSubtotal = () => {
    return cartData.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // For phone, only allow digits and max 10 characters
    if (name === 'phone') {
      if (!/^\d{0,10}$/.test(value)) return;
    }
    setDeliveryInfo({ ...deliveryInfo, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!deliveryInfo.firstName) newErrors.firstName = 'First Name is required.';
    if (!deliveryInfo.lastName) newErrors.lastName = 'Last Name is required.';
    if (!deliveryInfo.email) newErrors.email = 'Email is required.';
    if (!deliveryInfo.street) newErrors.street = 'Street Address is required.';
    if (!deliveryInfo.city) newErrors.city = 'City is required.';
    if (!deliveryInfo.state) newErrors.state = 'State is required.';
    if (!deliveryInfo.zipcode) newErrors.zipcode = 'Zip Code is required.';
    // Phone validation: must be 10 digits and start with 7, 8, or 9
    if (!deliveryInfo.phone) {
      newErrors.phone = 'Phone Number is required.';
    } else if (!/^[789]\d{9}$/.test(deliveryInfo.phone)) {
      newErrors.phone = 'Phone must be 10 digits and start with 7, 8, or 9.';
    }
    if (!paymentMethod) newErrors.paymentMethod = 'Please select a payment method.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!currentUser) {
      toast.error('You must be logged in to place an order.');
      return;
    }
    if (cartData.length === 0) {
      toast.error('Your cart is empty.');
      return;
    }
    if (!validateForm()) {
      toast.error('Please fill all required fields.');
      return;
    }

    const orderPayload = {
      userEmail: currentUser.email,
      items: cartData.map(item => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        artistId: item.artistId,
      })),
      total: calculateSubtotal() + shippingFee,
      deliveryInfo,
      paymentMethod,
    };

    try {
      const response = await axios.post(`${backendUrl}/api/orders/save`, orderPayload);
      if (response.data.success) {
        clearCart();
        toast.success('Order placed successfully!');
        navigate('/orders');
      } else {
        toast.error(response.data.message || 'Failed to place order.');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order.');
    }
  };

  // Remove number input arrows (spinners) for phone and zipcode
  const inputNumberNoArrows = "border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-8 mt-10 pt-10 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-8 lg:px-16">
      {/* Delivery Information */}
      <div className="flex flex-col gap-6 w-full sm:max-w-[480px] bg-white ">
        <div className="text-xl sm:text-2xl mb-4">
          <Title text1="DELIVERY" text2="INFORMATION" />
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <input
              className="border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="First Name"
              name="firstName"
              value={deliveryInfo.firstName}
              onChange={handleInputChange}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>
          <div className="w-full">
            <input
              className="border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={deliveryInfo.lastName}
              onChange={handleInputChange}
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>
        </div>
        <div>
          <input
            className="border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Email Address"
            name="email"
            value={deliveryInfo.email}
            onChange={handleInputChange}
            required
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>
        <div>
          <input
            className="border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Street Address"
            name="street"
            value={deliveryInfo.street}
            onChange={handleInputChange}
            required
          />
          {errors.street && <p className="text-red-500 text-sm">{errors.street}</p>}
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <input
              className="border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="City"
              name="city"
              value={deliveryInfo.city}
              onChange={handleInputChange}
              required
            />
            {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
          </div>
          <div className="w-full">
            <input
              className="border border-gray-300 rounded py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="State"
              name="state"
              value={deliveryInfo.state}
              onChange={handleInputChange}
              required
            />
            {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
          </div>
        </div>
        <div className="flex gap-4">
          <div className="w-full">
            <input
              className={inputNumberNoArrows}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Zip Code"
              name="zipcode"
              value={deliveryInfo.zipcode}
              onChange={handleInputChange}
              required
              autoComplete="off"
            />
            {errors.zipcode && <p className="text-red-500 text-sm">{errors.zipcode}</p>}
          </div>
          <div className="w-full">
            <input
              className={inputNumberNoArrows}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Phone Number"
              name="phone"
              value={deliveryInfo.phone}
              onChange={handleInputChange}
              required
              autoComplete="off"
              maxLength={10}
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
        </div>
      </div>

      {/* Cart Totals */}
      <div className="lg:w-1/2 w-full flex flex-col items-end">
        <CartTotal
          currency={currency}
          subtotal={calculateSubtotal()}
          shippingFee={shippingFee}
          onCheckout={handlePlaceOrder}
        />

        {/* Payment Method Section */}
        <div className="w-full mt-6 bg-white pt-4">
          <Title text1="PAYMENT" text2="METHOD" className="text-xl sm:text-2xl mb-4" />
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="UPI"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              UPI
            </label>
            {paymentMethod === 'UPI' && (
              <img
                src={upiImage}
                alt="UPI"
                className="w-20 h-20 object-contain mt-2"
              />
            )}
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="paymentMethod"
                value="Cash on Delivery"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
            {errors.paymentMethod && (
              <p className="text-red-500 text-sm">{errors.paymentMethod}</p>
            )}
          </div>
        </div>
        <button
          className="w-1/2 bg-black text-white py-2 hover:bg-gray-800 transition duration-300 mt-2 pt-4 items-end"
          onClick={handlePlaceOrder}
        >
          PLACE ORDER
        </button>
      </div>
    </div>
  );
};

export default PlaceOrders;