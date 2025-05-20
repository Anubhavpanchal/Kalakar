import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Productitem from './Productitem';
import Title from './Title';

const LatestCollection = () => {
  const { products } = useContext(ShopContext); // Access products from ShopContext

  return (
    <div className="my-10 mx-4">
      <div className="text-center py-8 text-3xl">
        <Title text1="LATEST" text2="COLLECTION" />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Discover our latest collection of stunning artworks.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 px-10 gap-4 gap-y-6">
        {products.slice(0, 10).map((item) => (
          <Productitem
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;