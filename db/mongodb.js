import mongoose from "mongoose";

const connectDB = async () => {
 try {
  await mongoose.connect(process.env.MONGODB_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
  });
  console.log("Connected to mongoDB.");
 } catch (error) {
  console.error(error);
 }
};

mongoose.connection.on("disconnected", () => {
 console.log("mongoDB disconnected!");
});

export default connectDB;
