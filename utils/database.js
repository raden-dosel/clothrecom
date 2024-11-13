import mongoose from "mongoose";
let isConnected = false;

export const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("Connection already exists.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "clothrecom",
    });
    isConnected = true;
    console.log("Connection created successfully.");
  } catch (error) {
    console.log("ERROR while connecting with the database:", error);
  }
};
