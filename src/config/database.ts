import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_CNN ?? "");
    console.log("database is connected to", db.connection.db.databaseName);
  } catch (error) {
    console.error('database connection error');
    throw new Error(`database connection error ${error}`);
  }
};

