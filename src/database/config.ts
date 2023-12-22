import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(
      "mongodb+srv://alejoDev95:qBdVIwc62gTpHhDR@alejodev.aunizba.mongodb.net/hospitalDB"
    );
    console.log("database is connected to", db.connection.db.databaseName);
  } catch (error) {
    console.error('database connection error');
    throw new Error(`database connection error ${error}`);
  }
};

