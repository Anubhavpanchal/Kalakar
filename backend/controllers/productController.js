import productModel from "../models/productModel.js";
import { v2 as cloudinary } from "cloudinary";
import Artist from "../models/artistModel.js";

// Function to add a product
const addProduct = async (req, res) => {
  try {
    const { name, artistName, artistId, price, description, category, type, bestseller } = req.body;

    // Validate required fields
    if (!name || !artistName || !price || !description || !category || !type) {
      return res.status(400).json({ success: false, message: "All fields are required except bestseller" });
    }

    // Check if at least one image is uploaded
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ success: false, message: "At least one image is required" });
    }

    // Upload images to Cloudinary
    const uploadImage = async (file) => {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "products",
      });
      return result.secure_url;
    };

    const imageUrls = [];
    if (req.files.image1) imageUrls.push(await uploadImage(req.files.image1[0]));
    if (req.files.image2) imageUrls.push(await uploadImage(req.files.image2[0]));
    if (req.files.image3) imageUrls.push(await uploadImage(req.files.image3[0]));
    if (req.files.image4) imageUrls.push(await uploadImage(req.files.image4[0]));

    // Create a new product
    const newProduct = new productModel({
      name,
      artistName,
      artistId,
      price,
      description,
      category,
      type,
      bestseller: bestseller === "true",
      image: imageUrls,
      date: Date.now(),
    });

    const savedProduct = await newProduct.save();

    // Update the artist's art array
    await Artist.findByIdAndUpdate(
      artistId,
      { $push: { art: savedProduct._id } }
    );

    res.status(201).json({ success: true, product: savedProduct });
  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get all products by artist ID
const getProductsByArtist = async (req, res) => {
  try {
    const { artistId } = req.params;
    const products = await productModel.find({ artistId });
    res.json({ success: true, products });
  } catch (error) {
    console.error("Error in getProductsByArtist:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// List all products
const listProduct = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.error("Error in listProduct:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Remove a product by ID
const removeProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.error("Error in removeProduct:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get a single product by ID
const singleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.error("Error in singleProduct:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// for artist to get products by IDs try kar raha hu
const getProductsByIds = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.json({ products: [] });
    }
    const products = await productModel.find({ _id: { $in: ids } });
    res.json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products by IDs' });
  }
};

export { addProduct, getProductsByArtist,getProductsByIds, listProduct, removeProduct, singleProduct };