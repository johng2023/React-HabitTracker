import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
  }
};
