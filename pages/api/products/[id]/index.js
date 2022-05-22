import nc from "next-connect";
import Product from "../../../../models/Product";
import connectDB from "../../../../utils/mongodb";
const handler = nc();

connectDB();

handler.get(async (req, res) => {
 const product = await Product.findById(req.query.id);
 res.sendDate(product);
});

export default handler;
