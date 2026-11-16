import Link from "next/link";

const routes = [
  { path: "/", purpose: "POC overview and live database status" },
  { path: "/users", purpose: "Register users and browse the user list" },
  { path: "/api/users", purpose: "GET API returning public user fields" },
  { path: "/products", purpose: "Add and browse products" },
  { path: "/todos", purpose: "Create, complete, and delete todos" },
  { path: "/api/health/db", purpose: "GET API for MongoDB connectivity" },
];

const technologies = [
  "Next.js 16 App Router",
  "React 19",
  "TypeScript",
  "MongoDB Node.js Driver",
  "Tailwind CSS 4",
  "Server Components, Server Actions, and Route Handlers",
  "Feature-wise TypeScript models and MongoDB data functions",
];

export default function Home() {
  return (
    <main className="flex-1 bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700">
            Proof of Concept
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Next.js + MongoDB
          </h1>
          <p className="mt-3 max-w-3xl text-slate-600">
            A full-stack learning project demonstrating user registration,
            product management, MongoDB access, and Next.js server features.
          </p>
        </header>

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            Current status
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            The live MongoDB connection status appears in the banner at the top
            of every page. The banner pings the database;{" "}
            <code>GET /api/health/db</code> exposes the same health check as a
            JSON Route Handler.
          </p>
        </section>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">
              Pages and API routes
            </h2>
            <ul className="mt-4 divide-y divide-slate-200">
              {routes.map(({ path, purpose }) => (
                <li
                  key={path}
                  className="flex flex-wrap items-center justify-between gap-2 py-3 first:pt-0 last:pb-0"
                >
                  <Link
                    href={path}
                    className="font-mono text-sm font-semibold text-indigo-700 hover:text-indigo-900"
                  >
                    {path}
                  </Link>
                  <span className="text-sm text-slate-600">{purpose}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Tech stack</h2>
            <ul className="mt-4 space-y-3">
              {technologies.map((technology) => (
                <li
                  key={technology}
                  className="rounded-lg bg-slate-50 px-4 py-3 text-sm text-slate-700"
                >
                  {technology}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-6 text-amber-800">
              This is a demo POC. User listing and product creation are
              accessible without login; do not expose it publicly with real user
              data.
            </p>
          </section>
        </div>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">
            Where files live
          </h2>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-600 md:grid-cols-2">
            <li>
              <strong className="text-slate-900">Routes:</strong>{" "}
              <code>src/app</code> maps folders and <code>page.tsx</code> files
              to URLs. API endpoints use <code>route.ts</code>.
            </li>
            <li>
              <strong className="text-slate-900">Feature code:</strong>{" "}
              <code>src/features/users</code>, <code>products</code>, and{" "}
              <code>todos</code> each contain their model, database functions,
              Server Actions, and feature UI.
            </li>
            <li>
              <strong className="text-slate-900">Models:</strong>{" "}
              <code>features/&lt;feature&gt;/model.ts</code> defines TypeScript
              data shapes. With the MongoDB driver, these types do not enforce a
              database schema by themselves.
            </li>
            <li>
              <strong className="text-slate-900">Shared code:</strong>{" "}
              <code>src/lib</code> contains the MongoDB connection and PIN
              hashing; <code>src/components/shared</code> contains shared UI.
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
