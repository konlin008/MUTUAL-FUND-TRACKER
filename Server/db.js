import mongoose from "mongoose";
import "dotenv/config";

const connectDb = async () => {
  try {
    const cnn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${cnn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
export default connectDb;
