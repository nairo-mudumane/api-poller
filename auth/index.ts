import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppRouter } from "./routes";
import { connectToDatabase } from "./services/db";

dotenv.config();
const PORT = process.env.PORT;
const server = express();

server.use(cors());
server.use(express.json());
AppRouter(server);

connectToDatabase().then(() =>
  server.listen(PORT, () => console.log(`http://localhost:${PORT}`))
);
