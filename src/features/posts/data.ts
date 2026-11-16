import "server-only";
import { ObjectId } from "mongodb";
import type { CreatePost, Post } from "./model";
import { getMongoClient } from "@/lib/mongodb";

const DB_NAME = "nexjs_practice";
const COLLECTION_NAME = "posts";

export async function createPost(data: CreatePost) {
  const client = await getMongoClient();

  return client
    .db(DB_NAME)
    .collection(COLLECTION_NAME)
    .insertOne({
      ...data,
      createdAt: new Date(),
    });
}

export async function getPosts(): Promise<Post[]> {
  const client = await getMongoClient();

  const posts = await client
    .db(DB_NAME)
    .collection(COLLECTION_NAME)
    .find()
    .sort({ createdAt: -1 })
    .toArray();

  return posts.map((post) => ({
    ...post,
    _id: (post._id as ObjectId).toString(),
  })) as Post[];
}
