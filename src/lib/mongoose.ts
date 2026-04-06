import mongoose from "mongoose";
import {
  getMongoUri,
  getResolvedMongoUri,
  isSrvDnsLookupError,
} from "@/lib/mongo-connection";

const MONGODB_DB = process.env.MONGODB_DB || "sma_systems";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var mongooseCache: MongooseCache | undefined;
}

const cache = global.mongooseCache || { conn: null, promise: null };

global.mongooseCache = cache;

export async function connectToMongoose() {
  if (cache.conn) {
    return cache.conn;
  }

  if (!cache.promise) {
    cache.promise = (async () => {
      const connectOptions = {
        dbName: MONGODB_DB,
        bufferCommands: false,
      };
      const uri = getMongoUri();

      try {
        return await mongoose.connect(uri, connectOptions);
      } catch (error) {
        if (!uri.startsWith("mongodb+srv://") || !isSrvDnsLookupError(error)) {
          throw error;
        }

        const fallbackUri = await getResolvedMongoUri();
        console.warn(
          "MongoDB SRV lookup failed. Retrying Mongoose with resolved Atlas hosts.",
        );
        return mongoose.connect(fallbackUri, connectOptions);
      }
    })().catch((error) => {
      cache.promise = null;
      throw error;
    });
  }

  cache.conn = await cache.promise;

  return cache.conn;
}
