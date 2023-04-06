import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectToDatabase } from "./services/database";
import { AppRouter } from "./routes";

dotenv.config();
const PORT = process.env.PORT;
const server = express();

server.use(cors());
server.use(express.json());
AppRouter(server);

connectToDatabase().then(() =>
  server.listen(PORT, () => console.log(`http://localhost:${PORT}`))
);
