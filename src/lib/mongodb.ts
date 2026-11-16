import "server-only";

import { MongoClient } from "mongodb";

const globalForMongo = globalThis as typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
};

let productionClientPromise: Promise<MongoClient> | undefined;

export function getMongoClient(): Promise<MongoClient> {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("Missing MONGODB_URI environment variable");
  }

  if (process.env.NODE_ENV === "production") {
    productionClientPromise ??= connect(uri, () => {
      productionClientPromise = undefined;
    });
    return productionClientPromise;
  }

  globalForMongo.mongoClientPromise ??= connect(uri, () => {
    globalForMongo.mongoClientPromise = undefined;
  });
  return globalForMongo.mongoClientPromise;
}

function connect(uri: string, onError: () => void): Promise<MongoClient> {
  return new MongoClient(uri).connect().catch((error: unknown) => {
    onError();
    throw error;
  });
}
