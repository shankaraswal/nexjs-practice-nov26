import "server-only";

import { getMongoClient } from "@/lib/mongodb";
import type { NewProduct, Product, ProductDocument } from "./model";

export async function getProducts(): Promise<Product[]> {
  const client = await getMongoClient();
  const products = await client
    .db()
    .collection<ProductDocument>("products")
    .find({})
    .sort({ createdAt: -1 })
    .toArray();

  return products.map((product) => ({
    id: product._id.toHexString(),
    name: product.name,
    description: product.description,
    priceInCents: product.priceInCents,
    createdAt: product.createdAt.toISOString(),
  }));
}

export async function createProduct(product: NewProduct): Promise<void> {
  const client = await getMongoClient();
  await client
    .db()
    .collection<ProductDocument>("products")
    .insertOne({
      ...product,
      createdAt: new Date(),
    });
}
