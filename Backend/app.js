import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import "dotenv/config";
import bcrypt from "bcrypt";
import User from "./models/User.js";

const app = express();
const port = process.env.PORT;

connectDB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Api is running" });
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.send({ message: "Please enter all fields" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.send({ message: "Email is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName: name,
      email: email,
      password: hashedPassword,
    });

    return res.json({
      message: "User created",
      user: {
        _id: user._id,
        userName: user.userName,
        email: user.email,
      },
    });
  } catch (error) {
    return res.json({
      message: "Failed to register user",
    });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send("Fill in all fields");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "Email does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        message: "Passwords do not match",
      });
    }

    return res.json({
      message: "Login Success",
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
