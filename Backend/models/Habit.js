import { Schema, model } from "mongoose";

const habitSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    color: {
      type: String,
      default: "#3B82F6",
    },
    habitCreator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Habit = model("Habit", habitSchema);
export default Habit;
