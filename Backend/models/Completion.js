import { Schema, model } from "mongoose";

const completionSchema = new Schema(
  {
    habitId: {
      type: Schema.Types.ObjectId,
      ref: "Habit",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    completedDate: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

completionSchema.index({ habitId: 1, completedDate: 1 }, { unique: true });

const Completion = model("Completion", completionSchema);
export default Completion;
