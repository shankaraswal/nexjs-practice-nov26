import "server-only";

import { ObjectId } from "mongodb";
import { getMongoClient } from "@/lib/mongodb";
import type { Todo, TodoDocument } from "./model";

export async function getTodos(): Promise<Todo[]> {
  const client = await getMongoClient();
  const todos = await client
    .db()
    .collection<TodoDocument>("todos")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return todos.map((todo) => ({
    id: todo._id.toHexString(),
    title: todo.title,
    completed: todo.completed,
    createdAt: todo.createdAt.toISOString(),
  }));
}

export async function createTodo(title: string): Promise<void> {
  const client = await getMongoClient();
  await client.db().collection<TodoDocument>("todos").insertOne({
    title,
    completed: false,
    createdAt: new Date(),
  });
}

export async function setTodoCompleted(
  id: string,
  completed: boolean,
): Promise<boolean> {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid todo ID.");
  }

  const client = await getMongoClient();
  const result = await client
    .db()
    .collection<TodoDocument>("todos")
    .updateOne({ _id: new ObjectId(id) }, { $set: { completed } });

  return result.matchedCount === 1;
}

export async function deleteTodo(id: string): Promise<boolean> {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid todo ID.");
  }

  const client = await getMongoClient();
  const result = await client
    .db()
    .collection<TodoDocument>("todos")
    .deleteOne({ _id: new ObjectId(id) });

  return result.deletedCount === 1;
}
