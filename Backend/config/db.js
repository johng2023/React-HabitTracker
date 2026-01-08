import mongoose from "mongoose";
import "dotenv/config";

export const connectDB = async () => {
  try {
    if (!process.env.CONNECTION_STRING) {
      throw new Error("CONNECTION_STRING environment variable is not set");
    }
    
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    
    if (error.message.includes("IP") || error.message.includes("whitelist")) {
      console.error("\n⚠️  IP Whitelist Issue Detected:");
      console.error("To fix this:");
      console.error("1. Go to MongoDB Atlas Dashboard");
      console.error("2. Navigate to Network Access");
      console.error("3. Click 'Add IP Address'");
      console.error("4. Add your current IP or use '0.0.0.0/0' for development (not recommended for production)");
      console.error("5. Wait a few minutes for changes to propagate\n");
    }
    
    // Don't exit the process, but log the error
    process.exit(1);
  }
};
