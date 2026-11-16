"use server";

import { revalidatePath } from "next/cache";
import { createTodo, deleteTodo as removeTodo, setTodoCompleted } from "./data";

function getTextField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

export async function addTodo(formData: FormData): Promise<void> {
  const title = getTextField(formData, "title").trim();

  if (title.length < 1 || title.length > 160) {
    throw new Error("Todo title must be between 1 and 160 characters.");
  }

  await createTodo(title);
  revalidatePath("/todos");
}

export async function toggleTodo(formData: FormData): Promise<void> {
  const id = getTextField(formData, "id");
  const completedValue = getTextField(formData, "completed");

  if (completedValue !== "true" && completedValue !== "false") {
    throw new Error("Invalid todo completion value.");
  }

  const updated = await setTodoCompleted(id, completedValue === "true");
  if (!updated) {
    throw new Error("Todo was not found.");
  }

  revalidatePath("/todos");
}

export async function deleteTodo(formData: FormData): Promise<void> {
  const id = getTextField(formData, "id");
  const deleted = await removeTodo(id);

  if (!deleted) {
    throw new Error("Todo was not found.");
  }

  revalidatePath("/todos");
}
