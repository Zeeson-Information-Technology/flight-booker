import { Schema, model, models } from "mongoose";

const searchRequestSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    earliestDate: { type: String, required: true },
    latestDate: { type: String, required: true },
    passengers: { type: Number, default: 1 },
    cabin: {
      type: String,
      enum: ["ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST"],
      default: "ECONOMY",
    },
    status: { type: String, default: "saved" },
  },
  { timestamps: true }
);

export const SearchRequest =
  models.SearchRequest || model("SearchRequest", searchRequestSchema);
export type SearchRequestDocument = typeof SearchRequest extends import("mongoose").Model<infer T> ? T : never;
