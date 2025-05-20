import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
   artistName: { 
    type: String,
    required: true,
  },
    artistId: { type: String, required: false }, // Added artistId field

  image: {
    type: Array, // Array to store multiple image URLs
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: { // Replaced subCategory with type
    type: String,
    required: true,
    enum: ["vertical", "horizontal"], // Restrict values to "vertical" or "horizontal"
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  bestseller: {
    type: Boolean,
    default: false, // Default value is false
  },
  date: {
    type: Number,
    required: true,
  },
});

// Check if the model already exists to avoid overwriting
const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;