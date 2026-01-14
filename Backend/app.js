import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import "dotenv/config";
import bcrypt from "bcrypt";
import verifyUser from "./JWT.js";
import jwt from "jsonwebtoken";
import User from "./models/User.js";
import Habit from "./models/Habit.js";
import Completion from "./models/Completion.js";

const app = express();
const port = process.env.PORT;

connectDB();

app.use(
  cors({
    origin: "https://your-frontend.onrender.com",
    credentials: true,
  })
);
app.use(express.json());

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.send({ message: "Please enter all fields" });
    }

    if (password.length < 8) {
      return res.send({ message: "Password must be at least 8 characters" });
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

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      message: "User created",
      token,
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
        message: "Password is incorrect",
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      token,
      user: { _id: user._id, userName: user.userName, email: user.email },
      message: "Login Success",
    });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
});

app.post("/api/create", verifyUser, async (req, res) => {
  try {
    const { title, description, color } = req.body;

    if (!title) {
      return res.json("Missing fields");
    }

    const habit = await Habit.create({
      title,
      description,
      color,
      habitCreator: req.userId,
    });

    return res.json({
      message: "New habit created",
      habit,
    });
  } catch (error) {
    return res.json({ message: error.message });
  }
});

app.get("/api/habits", verifyUser, async (req, res) => {
  try {
    const habits = await Habit.find({ habitCreator: req.userId });

    if (habits.length === 0) {
      return res.json({ message: "No habits exist" });
    }

    return res.json(habits);
  } catch (error) {
    return res.json({ message: error.message });
  }
});

app.patch("/api/update", verifyUser, async (req, res) => {
  try {
    const { id, title, description, color } = req.body;
    const habit = await Habit.findOne({ _id: id, habitCreator: req.userId });

    if (!habit) {
      return res.json({
        message: "No habits with that ID",
      });
    }

    habit.title = title;
    habit.description = description;
    habit.color = color;

    await habit.save();

    return res.json({ message: "Habit successfully updated" });
  } catch (error) {
    return res.json({
      message: error.message,
    });
  }
});

app.delete("/api/delete", verifyUser, async (req, res) => {
  try {
    const { id } = req.body;
    const habits = await Habit.findOne({ _id: id, habitCreator: req.userId });

    if (!habits) {
      return res.json({ message: "No habits deleted" });
    }

    await Habit.deleteOne({ _id: id });
    return res.json({ message: "Habit deleted successfully" });
  } catch (error) {
    return res.json({ message: error.message });
  }
});

//Completion Routes

app.post("/api/completions/toggle", verifyUser, async (req, res) => {
  try {
    const { habitId, date } = req.body;

    if (!habitId || !date) {
      return res.json({ message: "Missing inputs" });
    }

    const existingCompletion = await Completion.findOne({
      habitId,
      userId: req.userId,
      completedDate: date,
    });

    if (existingCompletion) {
      await Completion.deleteOne({ _id: existingCompletion._id });
      return res.json({ message: "Completion removed", completed: false });
    }

    const completion = await Completion.create({
      habitId,
      userId: req.userId,
      completedDate: date,
    });
    return res.json({
      message: "Completion successful",
      completed: true,
      completion,
    });
  } catch (error) {
    return res.json({ message: error.message });
  }
});

app.get("/api/completions/:habitId", verifyUser, async (req, res) => {
  try {
    const { habitId } = req.params;

    const completions = await Completion.find({
      habitId,
      userId: req.userId,
    }).sort({
      completedDate: -1,
    });

    return res.json({ completions });
  } catch (error) {
    return res.json({ message: error.message });
  }
});

app.get("/api/completions/:habitId/stats", verifyUser, async (req, res) => {
  try {
    const { habitId } = req.params;

    const completions = await Completion.find({
      habitId,
      userId: req.userId,
    }).sort({
      completedDate: -1,
    });

    return res.json({
      totalCompletions: completions.length,
      completions: completions.map((completion) => ({
        _id: completion._id,
        completedDate: completion.completedDate,
      })),
    });
  } catch (error) {
    return res.json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
