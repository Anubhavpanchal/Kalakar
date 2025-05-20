import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify'; // Import toast

const Add = ({ token }) => {
  const [price, setPrice] = useState('');
const [name, setName] = useState('');
const [artistName, setArtistName] = useState('');

  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState(''); // Replaced subCategory with type
  const [bestseller, setBestseller] = useState(false);
  const [images, setImages] = useState({ image1: null, image2: null, image3: null, image4: null });

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setPrice(value);
    }
  };

  const handleImageChange = (e, imageKey) => {
    const file = e.target.files[0];
    setImages((prev) => ({ ...prev, [imageKey]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !description || !category || !type || !price || !artistName) {
      toast.error('Please fill in all required fields.');
      return;
    }

    // Ensure at least one image is uploaded
    const hasAtLeastOneImage = Object.values(images).some((image) => image !== null);
    if (!hasAtLeastOneImage) {
      toast.error('Please upload at least one image.');
      return;
    }

    try {
      const formData = new FormData();

      // Prepare form data
      formData.append('name', name);
      formData.append('artistName', artistName); // Added artistName
      formData.append('description', description);
      formData.append('category', category);
      formData.append('type', type); // Added type
      formData.append('price', price);
      formData.append('bestseller', bestseller);
      Object.keys(images).forEach((key) => {
        if (images[key]) {
          formData.append(key, images[key]);
        }
      });

      // Send data to the backend
      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Correctly send the token as a Bearer token
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        toast.success('Product added successfully!');
        // Reset form fields
        setName('');
        setArtistName(''); // Reset artistName
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
      console.error('Error adding product:', error.response?.data || error.message);
      toast.error('An error occurred while adding the product.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-start gap-6 p-6 bg-gray-100 rounded-lg shadow-md"
    >
      <div>
        <p className="mb-2 text-lg font-semibold text-gray-700">Upload Images</p>
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((num) => (
            <label key={num} htmlFor={`image${num}`} className="cursor-pointer">
              <img
                className="w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-500"
                src={images[`image${num}`] ? URL.createObjectURL(images[`image${num}`]) : assets.upload_area}
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

      <div className="w-full">
        <p className="mb-2 text-lg font-semibold text-gray-700">Art Name</p>
        <input
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
          type="text"
          placeholder="Enter product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>


        <div className="w-full">
        <p className="mb-2 text-lg font-semibold text-gray-700">Artist Name</p>
        <input
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
          type="text"
          placeholder="Enter product name"
          value={artistName}
          onChange={(e) => setArtistName(e.target.value)}
          required
        />
      </div>

      <div className="w-full">
        <p className="mb-2 text-lg font-semibold text-gray-700">Art Description</p>
        <textarea
          className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
          placeholder="Write product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-6 w-full">
        <div>
          <p className="mb-2 text-lg font-semibold text-gray-700">Art Category</p>
          <select
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
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
            required
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
            required
          />
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={(e) => setBestseller(e.target.checked)}
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button
        type="submit"
        className="w-full max-w-lg px-4 py-2 mt-4 text-white bg-black rounded-lg hover:bg-gray-800 transition duration-300"
      >
        Add Product
      </button>
    </form>
  );
};

export default Add;