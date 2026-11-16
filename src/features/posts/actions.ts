"use server";

import { revalidatePath } from "next/cache";
import { createPost } from "./data";
import type { CreatePost } from "./model";

export async function createPostAction(data: CreatePost) {
  const result = await createPost(data);

  if (!result.acknowledged) {
    throw new Error("Post creation was not acknowledged.");
  }

  revalidatePath("/posts");

  return {
    success: result.acknowledged,
    insertedId: result.insertedId.toString(),
  };
}
