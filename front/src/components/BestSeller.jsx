import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Productitem from './Productitem';
import Title from './Title';
import { useNavigate } from 'react-router-dom';

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleProductClick = (id) => (e) => {
    e.preventDefault();
    navigate(`/product/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const bestSellers = products.filter((item) => item.bestseller);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1="OUR" text2="BEST SELLERS" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Explore our top-selling artworks, loved by our customers.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-10 gap-4 gap-y-6">
        {bestSellers.slice(0, 10).map((item) => (
          <Productitem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
            onClick={handleProductClick(item._id)}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;