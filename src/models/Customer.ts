import { Schema, model, models } from "mongoose";

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

export const Customer = models.Customer || model("Customer", customerSchema);
export type CustomerDocument = typeof Customer extends import("mongoose").Model<infer T> ? T : never;
