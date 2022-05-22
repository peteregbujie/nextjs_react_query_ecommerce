import nc from "next-connect";
import Product from "../../../models/Product";
import connectDB from "../../../utils/mongodb";

connectDB();

const handler = nc();

handler.get(async (req, res) => {
 const products = await Product.find({});
 res.send(products);
});

export default handler;
