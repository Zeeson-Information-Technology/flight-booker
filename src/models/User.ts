import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const User = models.User || model("User", userSchema);
export type UserDocument = typeof User extends import("mongoose").Model<infer T> ? T : never;
