import nc from "next-connect";
import Product from "../../../../models/Product";
import connectDB from "../../../../utils/mongodb";

const handler = nc();

connectDB();

handler.get(async (req, res) => {
 const product = await Product.findOne({ slug: req.query.slug });
 console.log(product);
 res.send(product);
});

export default handler;
