import React, { useContext, useState, useEffect } from 'react';
import BestSeller from '../components/BestSeller';
import { ShopContext } from '../context/ShopContext';
import Productitem from '../components/Productitem';
import Filters from '../components/Filters';
import Search from '../components/Search';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import Title from '../components/Title';
import { useNavigate } from 'react-router-dom';

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState('relavent');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const handleCategoryChange = (value, type) => {
    setSelectedCategories((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleSortChange = (e) => {
    setSortOption(e.value);
  };

  useEffect(() => {
    let filtered = products.filter(
      (product) =>
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category) ||
          selectedCategories.includes(product.type)) &&
        (searchQuery === '' || product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    if (sortOption === 'low-high') {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'high-low') {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategories, searchQuery, sortOption]);

  const sortOptions = [
    { label: 'Sort by: Relavent', value: 'relavent' },
    { label: 'Sort by: Low to High', value: 'low-high' },
    { label: 'Sort by: High to Low', value: 'high-low' },
  ];

  // This function will scroll to top after navigating to the product page
  const handleProductClick = (id) => (e) => {
    e.preventDefault();
    navigate(`/product/${id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Search onSearch={setSearchQuery} />
      <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 px-10">
        <Filters
          selectedCategories={selectedCategories}
          handleCategoryChange={handleCategoryChange}
        />
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center text-base sm:text-2xl mb-4">
            <Title text1={'All'} text2={'COLLECTIONS'} />
            <Dropdown
              value={sortOption}
              options={sortOptions}
              onChange={handleSortChange}
              placeholder="Sort by"
              className="w-40"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {filteredProducts.map((product) => (
              <Productitem
                key={product._id}
                id={product._id}
                name={product.name}
                image={product.image}
                price={product.price}
                onClick={handleProductClick(product._id)}
              />
            ))}
          </div>
        </div>
      </div>
      <BestSeller />
    </div>
  );
};

export default Collection;