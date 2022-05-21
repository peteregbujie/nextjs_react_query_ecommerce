import mongoose from "mongoose";

const imageSchema = new Schema({
 url: { type: String },
 text: { type: String },
});

const imagesSchema = new Schema({
 images: [imageSchema],
});

const productSchema = new mongoose.Schema(
 {
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  images: [imagesSchema],
  price: { type: Number, required: true },
  brand: { type: String, required: false },
  qtyInStock: { type: Number, required: true, default: 0 },
  description: { type: String, required: true },
 },
 {
  timestamps: true,
 }
);

const Product =
 mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
