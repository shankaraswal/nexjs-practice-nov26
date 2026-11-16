import "server-only";

import { getMongoClient } from "@/lib/mongodb";
import type { PublicUser, UserDocument } from "./model";

export async function createUser(
  user: Omit<UserDocument, "createdAt">,
): Promise<void> {
  const client = await getMongoClient();
  const users = client.db().collection<UserDocument>("users");
  await users.createIndex({ email: 1 }, { unique: true });
  await users.insertOne({ ...user, createdAt: new Date() });
}

export async function getPublicUsers(): Promise<PublicUser[]> {
  const client = await getMongoClient();
  const users = await client
    .db()
    .collection<UserDocument>("users")
    .find({}, { projection: { name: 1, createdAt: 1 } })
    .sort({ createdAt: -1 })
    .limit(100)
    .toArray();

  return users.map((user) => ({
    id: user._id.toHexString(),
    name: user.name,
    createdAt: user.createdAt.toISOString(),
  }));
}
