import nc from "next-connect";
import Product from "../../../models/Product";
import connectDB from "../../../utils/mongodb";

connectDB();

const handler = nc();

handler.get(async (req, res) => {
 const products = await Product.find({});
 res.status(200).json(products);
});

export default handler;
