import mongoose from "mongoose";

const connection = {
  isConnected: false,
};

export const connectToDb = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = await mongoose.connect(process.env.MONGO as string);
    connection.isConnected = db.connections[0].readyState === 1; // 1 означает "connected"
    console.log("New connection established");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Database connection error!");
  }
};
