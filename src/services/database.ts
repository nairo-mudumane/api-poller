import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const uri = process.env.DB_URL;
const dbName = process.env.DB_NAME;

export async function connectToDatabase(): Promise<void> {
  console.log("connecting to database...");

  try {
    if (uri) {
      mongoose.set("debug", true);
      await mongoose.connect(String(uri), {
        dbName,
        retryReads: true,
        retryWrites: true,
        connectTimeoutMS: 12000,
      });
    } else throw new Error("No database url provided");
  } catch (error) {
    console.error((error as Error).message);
    process.exit(1);
  }

  console.log("connected to database");
}
