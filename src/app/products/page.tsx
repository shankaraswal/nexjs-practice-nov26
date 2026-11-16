import { Suspense } from "react";
import { connection } from "next/server";
import ProductForm from "@/features/products/components/product-form";
import { getProducts } from "@/features/products/data";
import type { Product } from "@/features/products/model";

type ProductListResult =
  | { success: true; products: Product[] }
  | { success: false };

async function loadProducts(): Promise<ProductListResult> {
  try {
    return { success: true, products: await getProducts() };
  } catch (error) {
    console.error("Product list load failed:", error);
    return { success: false };
  }
}

async function ProductList() {
  await connection();
  const result = await loadProducts();

  if (!result.success) {
    return (
      <p className="rounded-lg bg-rose-50 p-4 text-sm text-rose-800">
        Could not load products. Check the database connection and try again.
      </p>
    );
  }

  if (result.products.length === 0) {
    return (
      <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
        No products yet. Add your first product using the form.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {result.products.map((product) => (
        <li
          key={product.id}
          className="rounded-xl border border-slate-200 bg-white p-4"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <h3 className="font-semibold text-slate-950">{product.name}</h3>
            <span className="font-semibold tabular-nums text-indigo-700">
              {(product.priceInCents / 100).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          {product.description && (
            <p className="mt-2 whitespace-pre-wrap text-sm text-slate-600">
              {product.description}
            </p>
          )}
          <p className="mt-3 text-xs text-slate-500">
            Added {new Date(product.createdAt).toLocaleString()}
          </p>
        </li>
      ))}
    </ul>
  );
}

function ProductListFallback() {
  return (
    <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
      Loading products...
    </p>
  );
}

export default function ProductsPage() {
  return (
    <main className="flex-1 bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700">
            Catalog
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Products
          </h1>
          <p className="mt-2 text-slate-600">
            Add products and browse the catalog stored in MongoDB.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <section className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-slate-950">
              Add a product
            </h2>
            <ProductForm />
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-slate-950">
              Product list
            </h2>
            <Suspense fallback={<ProductListFallback />}>
              <ProductList />
            </Suspense>
          </section>
        </div>

        <aside className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">
            How this page works
          </h2>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-600 md:grid-cols-2">
            <li>
              <strong className="text-slate-900">Server Component:</strong>{" "}
              <code>ProductsPage</code> renders the page, while{" "}
              <code>ProductList</code> loads products on the server.
            </li>
            <li>
              <strong className="text-slate-900">Client Component:</strong>{" "}
              <code>ProductForm</code> handles the add form, pending state, and
              success or error feedback.
            </li>
            <li>
              <strong className="text-slate-900">Server Action:</strong>{" "}
              <code>addProduct</code> validates input, stores the price as
              integer minor units, then refreshes this route.
            </li>
            <li>
              <strong className="text-slate-900">Data Access Layer:</strong>{" "}
              <code>src/features/products/data.ts</code> contains the
              server-only MongoDB read and write functions.
            </li>
            <li>
              <strong className="text-slate-900">Health API:</strong>{" "}
              <code>GET /api/health/db</code> is a Route Handler for a JSON
              connection check; the top banner shows the same kind of status
              across pages.
            </li>
            <li>
              <strong className="text-slate-900">Demo access:</strong> this
              route is open; any visitor can view and add products.
            </li>
          </ul>
        </aside>
      </div>
    </main>
  );
}
