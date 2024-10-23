import mongoose from "mongoose";

const mongoOptions = {
  retryWrites: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000
};

const connectDB = async () => {
  if (process.env.MONGO_URI !== undefined) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, mongoOptions);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1);
    }
  }
};

export default connectDB;