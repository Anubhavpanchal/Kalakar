import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const currency = '₹';

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${backendUrl}/api/product/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        toast.success('Product deleted successfully!');
        setList(list.filter((item) => item._id !== id));
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting product:', error.response?.data || error.message);
      toast.error('Failed to delete the product.');
    }
  };

  useEffect(() => {
    fetchList();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex flex-col w-full items-start gap-4 p-4 bg-gray-100 rounded-lg shadow-md">
      <p className="text-lg font-semibold text-gray-700">All Artworks</p>
      <div className="flex flex-col gap-2 w-full">
        {/* Desktop Table header */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border bg-gray-200 text-sm font-semibold text-gray-700 rounded-lg">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>
        {/* Table body for desktop */}
        <div className="hidden md:flex flex-col gap-2 w-full">
          {list.length === 0 ? (
            <div className="py-4 text-gray-500">No artworks found.</div>
          ) : (
            list.map((item) => (
              <div
                key={item._id}
                className="grid grid-cols-1 md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border bg-white text-sm rounded-lg shadow-sm hover:shadow-md transition duration-300"
              >
                <div className="flex justify-center md:block">
                  <img
                    src={item.image && item.image[0] ? item.image[0] : ''}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </div>
                <p className="font-medium text-gray-700">{item.name}</p>
                <p className="text-gray-600">{item.category}</p>
                <p className="text-gray-800 font-semibold">
                  {currency}
                  {item.price}
                </p>
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
        {/* Mobile cards */}
        <div className="md:hidden flex flex-col gap-4 w-full">
          {list.length === 0 ? (
            <div className="py-4 text-gray-500">No artworks found.</div>
          ) : (
            list.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 items-center border bg-white rounded-lg shadow-sm p-3"
              >
                <img
                  src={item.image && item.image[0] ? item.image[0] : ''}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded shadow"
                />
                <div className="flex flex-col gap-1 flex-1">
                  <span className="font-semibold text-gray-800">{item.name}</span>
                  <span className="text-gray-600 text-xs">{item.category}</span>
                  <span className="text-gray-800 font-bold text-sm">
                    {currency}
                    {item.price}
                  </span>
                  <button
                    className="text-red-500 hover:underline mt-2 w-fit"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default List;