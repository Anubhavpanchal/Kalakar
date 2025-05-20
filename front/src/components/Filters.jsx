import React, { useState } from 'react';

const Filters = ({ selectedCategories, handleCategoryChange }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const categories = ['oil', 'pen', 'water'];
  const types = ['vertical', 'horizontal'];

  return (
    <div className="min-w-full sm:min-w-60">
      {/* Filters Header */}
      <div
        className="my-2 text-xl flex items-center justify-between cursor-pointer border-b pb-2"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <p className="text-gray-800 font-semibold">FILTERS</p>
        <span className="text-gray-500 sm:hidden">
          {isDropdownOpen ? '▲' : '▼'}
        </span>
      </div>

      {/* Dropdown Content (Visible only on small screens) */}
      {isDropdownOpen && (
        <div className="mt-4 sm:hidden bg-gray-50 border border-gray-300 rounded-lg shadow-lg p-4">
          {/* Categories Section */}
          <div className="mb-6">
            <p className="mb-3 text-sm font-medium text-gray-700">CATEGORIES</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {categories.map((category) => (
                <label key={category} className="flex gap-2 items-center">
                  <input
                    className="w-4 h-4"
                    type="checkbox"
                    value={category}
                    checked={selectedCategories.includes(category)}
                    onChange={(e) => handleCategoryChange(e.target.value, 'category')}
                  />
                  <span>{category.toUpperCase()} ART</span>
                </label>
              ))}
            </div>
          </div>

          {/* Type Section */}
          <div>
            <p className="mb-3 text-sm font-medium text-gray-700">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {types.map((type) => (
                <label key={type} className="flex gap-2 items-center">
                  <input
                    className="w-4 h-4"
                    type="checkbox"
                    value={type}
                    checked={selectedCategories.includes(type)}
                    onChange={(e) => handleCategoryChange(e.target.value, 'type')}
                  />
                  <span>{type.toUpperCase()} ART</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Expanded Filters (Visible only on larger screens) */}
      <div className="hidden sm:block">
        {/* Categories Section */}
        <div className="border border-gray-300 shadow-lg pl-5 py-3">
          <p className="mb-3 text-sm font-medium text-gray-700">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {categories.map((category) => (
              <label key={category} className="flex gap-2 items-center">
                <input
                  className="w-4 h-4"
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={(e) => handleCategoryChange(e.target.value, 'category')}
                />
                <span>{category.toUpperCase()} ART</span>
              </label>
            ))}
          </div>
        </div>

        {/* Type Section */}
        <div className="border border-gray-300 shadow-lg pl-5 py-3 mt-6">
          <p className="mb-3 text-sm font-medium text-gray-700">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {types.map((type) => (
              <label key={type} className="flex gap-2 items-center">
                <input
                  className="w-4 h-4"
                  type="checkbox"
                  value={type}
                  checked={selectedCategories.includes(type)}
                  onChange={(e) => handleCategoryChange(e.target.value, 'type')}
                />
                <span>{type.toUpperCase()} ART</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;