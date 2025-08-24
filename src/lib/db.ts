import mongoose from "mongoose";
import { env } from "@/env";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

const globalWithMongoose = global as typeof globalThis & {
  mongoose?: MongooseCache;
};

export async function connect() {
  const cache =
    globalWithMongoose.mongoose ??= { conn: null, promise: null };
  if (cache.conn) {
    return cache.conn;
  }
  if (!cache.promise) {
    cache.promise = mongoose.connect(env.MONGODB_URI);
  }
  cache.conn = await cache.promise;
  return cache.conn;
}
