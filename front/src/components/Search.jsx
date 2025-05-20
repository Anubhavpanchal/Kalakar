import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState(''); // State to track the search query

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Trigger search dynamically on input change
  };

  return (
    <div className="w-full flex items-center justify-center my-4">
      <form className="flex items-center gap-2 w-full sm:w-1/2">
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={handleInputChange} // Trigger search on input change
          className="w-full border border-gray-300 rounded-md p-2 outline-none"
        />
      </form>
    </div>
  );
};

export default Search;