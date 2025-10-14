import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema(
  {
    task: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Todo = mongoose.model("Todo", todoSchema);
