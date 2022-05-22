import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
 {
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  images: { type: Array, required: true },
  price: { type: Number, required: true, trim: true },
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
