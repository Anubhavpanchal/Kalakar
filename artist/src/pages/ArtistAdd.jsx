import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendUrl } from '../App';

const ArtistAdd = ({ token, artistId }) => {
  const [price, setPrice] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [bestseller, setBestseller] = useState(false);
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });

  const artistName = localStorage.getItem('artistName') || 'Unknown Artist';

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setPrice(value);
    }
  };

  const handleImageChange = (e, imageKey) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prev) => ({ ...prev, [imageKey]: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validations
    if (!name || !description || !category || !type || !price) {
      toast.error('Please fill in all required fields.');
      return;
    }

    const hasAtLeastOneImage = Object.values(images).some((img) => img !== null);
    if (!hasAtLeastOneImage) {
      toast.error('Please upload at least one image.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('artistName', artistName);
      const artistUser = localStorage.getItem('artistUser');
      const artistId = artistUser ? JSON.parse(artistUser).id : '';
      formData.append('artistId', artistId);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('type', type);
      formData.append('price', price);
      formData.append('bestseller', bestseller);

      Object.entries(images).forEach(([key, file]) => {
        if (file) {
          formData.append(key, file);
        }
      });

      const response = await axios.post(`${backendUrl}/api/product/artist-add`, formData, {
  headers: {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  },
});

      if (response.data.success) {
        toast.success('Product added successfully!');
        // Reset form
        setName('');
        setDescription('');
        setCategory('');
        setType('');
        setPrice('');
        setBestseller(false);
        setImages({ image1: null, image2: null, image3: null, image4: null });
      } else {
        toast.error(response.data.message || 'Failed to add product.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('An error occurred while adding the product.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-start gap-6 p-6 bg-gray-100 rounded-lg shadow-md"
    >
      {/* Upload Images */}
      <div>
        <p className="mb-2 text-lg font-semibold text-gray-700">Upload Images</p>
        <div className="flex gap-4 flex-wrap">
          {[1, 2, 3, 4].map((num) => (
            <label key={num} htmlFor={`image${num}`} className="cursor-pointer">
              <img
                className="w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-500"
                src={
                  images[`image${num}`]
                    ? URL.createObjectURL(images[`image${num}`])
                    : assets.upload_area
                }
                alt={`Upload area ${num}`}
              />
              <input
                type="file"
                id={`image${num}`}
                hidden
                onChange={(e) => handleImageChange(e, `image${num}`)}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Art Name */}
      <div className="w-full">
        <p className="mb-2 text-lg font-semibold text-gray-700">Art Name</p>
        <input
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
          type="text"
          placeholder="Enter art name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Artist Name (readonly) */}
      <div className="w-full">
        <p className="mb-2 text-lg font-semibold text-gray-700">Artist Name</p>
        <div className="w-full max-w-lg px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700">
          {artistName}
        </div>
      </div>

      {/* Description */}
      <div className="w-full">
        <p className="mb-2 text-lg font-semibold text-gray-700">Art Description</p>
        <textarea
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
          placeholder="Write product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Category, Type, Price */}
      <div className="flex flex-col sm:flex-row gap-6 w-full">
        <div>
          <p className="mb-2 text-lg font-semibold text-gray-700">Art Category</p>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="oil">Oil Art</option>
            <option value="pen">Pen Art</option>
            <option value="water">Water Art</option>
          </select>
        </div>

        <div>
          <p className="mb-2 text-lg font-semibold text-gray-700">Type</p>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="vertical">Vertical</option>
            <option value="horizontal">Horizontal</option>
          </select>
        </div>

        <div>
          <p className="mb-2 text-lg font-semibold text-gray-700">Art Price</p>
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            type="number"
            placeholder="Enter price"
            value={price}
            onChange={handlePriceChange}
          />
        </div>
      </div>

      {/* Bestseller Toggle */}
      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
        />
        <label htmlFor="bestseller" className="cursor-pointer text-gray-700">
          Add to bestseller
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full max-w-lg px-4 py-2 mt-4 text-white bg-black rounded-lg hover:bg-gray-800 transition duration-300"
      >
        Add Product
      </button>
    </form>
  );
};

export default ArtistAdd;
