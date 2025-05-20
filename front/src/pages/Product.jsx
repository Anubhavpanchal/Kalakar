import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import BestSeller from '../components/BestSeller';

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const currency = '₹';
  const navigate = useNavigate();

  // Fetch product data based on productId
  const fetchProductData = () => {
    if (products && products.length > 0) {
      const product = products.find((item) => item._id === productId);
      if (product) {
        setProductData(product);
        setImage(product.image[0]);
        // Scroll to top when product changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    fetchProductData();
    // Scroll to top when product page loads
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId, products]);

  // Handle Add to Cart
  const handleAddToCart = () => {
    if (productData) {
      addToCart(productData._id);
      navigate('/cart');
    }
  };

  // Handler for BestSeller and other product links to scroll to top
  const handleProductClick = (id) => (e) => {
    e.preventDefault();
    navigate(`/product/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return productData ? (
    <div className="pt-5 px-6 transition-opacity ease-in duration-500 opacity-100">
      {/* Product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt={productData.name}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt={productData.name} />
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1">
          <h1 className="text-2xl mt-2 font-medium">{productData.name}</h1>
          <p className="mt-5 text-3xl font-medium">
            {currency}{productData.price}
          </p>
          <p className="mt-5 text-gray-900 md:w-4/5">
            Artist: {productData.artistName || 'Unknown Artist'}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          
          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-8 py-3 mt-5 text-sm active:bg-gray-700 hover:bg-gray-800 transition duration-300"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% original</p>
            <p>30 days return</p>
            <p>Cash on delivery</p>
          </div>
        </div>
      </div>
      {/* Pass handleProductClick to BestSeller so clicking a best seller scrolls to top */}
      <BestSeller onProductClick={handleProductClick} />
    </div>
  ) : (
    <div className="text-center py-20">
      <h1 className="text-2xl font-semibold">Product Not Found</h1>
      <p className="text-gray-500">The product you are looking for does not exist.</p>
    </div>
  );
};

export default Product;