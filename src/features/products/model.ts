export type Product = {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  createdAt: string;
};

export type NewProduct = Omit<Product, "id" | "createdAt">;

export type ProductDocument = Omit<Product, "id" | "createdAt"> & {
  createdAt: Date;
};
