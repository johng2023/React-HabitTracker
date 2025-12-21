import express from "express";
import axios from "axios";
import cors from "cors";
import { connectDB } from "./config/db.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT;

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Helloooo");
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
