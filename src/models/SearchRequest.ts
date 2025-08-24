import { Schema, model, models } from "mongoose";

const searchRequestSchema = new Schema(
  {
    customer: { type: Schema.Types.ObjectId, ref: "Customer" },
    origin: { type: String, required: true },
    destination: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

export const SearchRequest =
  models.SearchRequest || model("SearchRequest", searchRequestSchema);
export type SearchRequestDocument = typeof SearchRequest extends import("mongoose").Model<infer T> ? T : never;
