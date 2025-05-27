import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ShopContext = createContext();
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ShopContextProvider = (props) => {
  const currency = "₹";
  const delivery_fee = 10;

  // State to manage cart items, initialized from localStorage
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : {};
  });

  // State to manage products fetched from the backend
  const [products, setProducts] = useState([]);

  // State to manage orders
  const [orders, setOrders] = useState([]);

  // Loader state
  const [loading, setLoading] = useState(true);


  // count of cart 
const getCartCount = () => {
  return Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);
};


  // Sync cart items with localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${backendUrl}/api/product/list`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.products);
      } else {
        console.error("Error from backend:", data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders for the logged-in user
  const fetchOrders = async (userEmail) => {
    try {
      const response = await axios.get(`${backendUrl}/api/orders/user`, {
        params: { userEmail },
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        console.error("Error fetching orders:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error.response?.data || error.message);
    }
  };

  // Save a new order to the backend
  const saveOrder = async (orderData) => {
    try {
      const response = await axios.post(`${backendUrl}/api/orders/save`, orderData);
      if (response.data.success) {
        setOrders((prevOrders) => [...prevOrders, response.data.order]);
        console.log("Order saved successfully:", response.data.order);
      } else {
        console.error("Error saving order:", response.data.message);
      }
    } catch (error) {
      console.error("Error saving order:", error.response?.data || error.message);
    }
  };

  // Fetch products when the component mounts
  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  // Add product to cart
  const addToCart = (productId) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [productId]: (prevCartItems[productId] || 0) + 1,
    }));
  };

  // Update cart item quantity
  const updateCart = (productId, quantity) => {
    setCartItems((prevCartItems) => {
      const updatedCart = { ...prevCartItems };
      if (quantity > 0) {
        updatedCart[productId] = quantity;
      } else {
        delete updatedCart[productId];
      }
      return updatedCart;
    });
  };

  // Remove a product from the cart
  const removeFromCart = (productId) => {
    setCartItems((prevCartItems) => {
      const updatedCart = { ...prevCartItems };
      delete updatedCart[productId];
      return updatedCart;
    });
  };

  // Clear the entire cart
  const clearCart = () => {
    setCartItems({});
  };

  // Calculate the total price of items in the cart
  const calculateTotal = () => {
    return Object.keys(cartItems).reduce((total, productId) => {
      const product = products.find((item) => item._id === productId);
      if (product) {
        return total + product.price * cartItems[productId];
      }
      return total;
    }, 0);
  };

  // Context value to provide
  const value = {
    currency,
    delivery_fee,
    cartItems,
    products,
    orders,
    addToCart,
    updateCart,
    removeFromCart,
    clearCart,
    calculateTotal,
    fetchOrders,
    saveOrder,
    backendUrl,
    loading, 
     getCartCount,
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;