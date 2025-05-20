import mongoose from "mongoose";

const artistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  art: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product"
    }
  ]
});

// // Example: After saving the product
// const savedProduct = await newProduct.save();

// // Update the artist's art array
// await Artist.findByIdAndUpdate(
//   artistId, // The artist's _id (should be sent from frontend)
//   { $push: { art: savedProduct._id } }
// );

export default mongoose.model("Artist", artistSchema);