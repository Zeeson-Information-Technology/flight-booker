import { Schema, model, models } from "mongoose";

const emailLogSchema = new Schema(
  {
    to: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String },
    sentAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const EmailLog = models.EmailLog || model("EmailLog", emailLogSchema);
export type EmailLogDocument = typeof EmailLog extends import("mongoose").Model<infer T> ? T : never;
