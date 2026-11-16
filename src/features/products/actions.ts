"use server";

import { revalidatePath } from "next/cache";
import { createProduct } from "./data";
import type { ProductActionState } from "./action-state";

function getTextField(formData: FormData, name: string): string {
  const value = formData.get(name);
  return typeof value === "string" ? value : "";
}

export async function addProduct(
  _previousState: ProductActionState,
  formData: FormData,
): Promise<ProductActionState> {
  const name = getTextField(formData, "name").trim();
  const description = getTextField(formData, "description").trim();
  const price = getTextField(formData, "price").trim();

  if (name.length < 2 || name.length > 120) {
    return {
      status: "error",
      message: "Product name must be 2 to 120 characters.",
    };
  }

  if (description.length > 1000) {
    return {
      status: "error",
      message: "Description must be 1,000 characters or fewer.",
    };
  }

  if (!/^\d{1,8}(?:\.\d{1,2})?$/.test(price)) {
    return {
      status: "error",
      message: "Enter a positive price with up to two decimal places.",
    };
  }

  const [wholePart, fractionalPart = ""] = price.split(".");
  const priceInCents =
    Number(wholePart) * 100 + Number(fractionalPart.padEnd(2, "0"));

  if (!Number.isSafeInteger(priceInCents) || priceInCents <= 0) {
    return { status: "error", message: "Enter a valid positive price." };
  }

  try {
    await createProduct({ name, description, priceInCents });
    revalidatePath("/products");

    return { status: "success", message: "Product added successfully." };
  } catch (error) {
    console.error("Product creation failed:", error);
    return {
      status: "error",
      message: "Could not add the product. Check the database connection and try again.",
    };
  }
}
