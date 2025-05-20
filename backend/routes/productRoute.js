import express from "express";
import {
  addProduct,
  listProduct,
  removeProduct,
  singleProduct,
  getProductsByArtist,
  getProductsByIds // <-- add this to the main import
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import artistAuth from "../middleware/artistAuth.js";

const productRouter = express.Router();

// Admin add product route (commented out, enable if needed)
productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

// Artist add product route
productRouter.post(
  "/artist-add",
  artistAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

productRouter.get("/list", listProduct);
productRouter.delete("/remove/:id", adminAuth, removeProduct);
productRouter.get("/single/:id", singleProduct);
productRouter.get("/artist/:artistId", getProductsByArtist);

// Add this route for fetching products by an array of IDs
productRouter.post("/by-ids", getProductsByIds);

export default productRouter;