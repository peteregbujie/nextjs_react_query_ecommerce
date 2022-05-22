import nc from "next-connect";
import Product from "../../models/Product.js";
import data from "../../utils/data.js";
import connectDB from "../../utils/mongodb.js";

connectDB();

const handler = nc();

handler.get(async (req, res) => {
 await Product.deleteMany({});
 await Product.insertMany(data.products);
 res.send({ message: "products seeded sucessfully" });
});

export default handler;
