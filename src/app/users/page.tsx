import Link from "next/link";
import RegistrationForm from "@/features/users/components/registration-form";
import UserList from "@/features/users/components/user-list";

export default function UsersPage() {
  return (
    <main className="flex-1 bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700">
            User management
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Users
          </h1>
          <p className="mt-2 text-slate-600">
            Register a user and browse the latest public user records on one
            page.
          </p>
        </header>

        <div className="grid gap-8 lg:grid-cols-2">
          <section className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-slate-950">
              Register a user
            </h2>
            <RegistrationForm />
          </section>

          <section className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold text-slate-950">
                  User list
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Names and registration dates only.
                </p>
              </div>
              <Link
                href="/api/users"
                className="text-sm font-medium text-indigo-700 hover:text-indigo-900"
              >
                View JSON API
              </Link>
            </div>
            <UserList />
          </section>
        </div>

        <aside className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            How this page works
          </h2>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-slate-600 md:grid-cols-2">
            <li>
              <strong className="text-slate-900">Server Component:</strong>{" "}
              <code>src/app/users/page.tsx</code> renders this combined page.
            </li>
            <li>
              <strong className="text-slate-900">Registration form:</strong>{" "}
              <code>RegistrationForm</code> is a Client Component that uses{" "}
              <code>useActionState</code> for submission feedback.
            </li>
            <li>
              <strong className="text-slate-900">Server Action + DAL:</strong>{" "}
              <code>registerUser</code> validates and hashes the PIN, then{" "}
              <code>src/features/users/data.ts</code> writes the user and
              enforces a unique email index.
            </li>
            <li>
              <strong className="text-slate-900">User list API:</strong>{" "}
              <code>UserList</code> fetches <code>GET /api/users</code>; its
              Route Handler returns up to 100 names and registration dates,
              never email addresses or PIN hashes.
            </li>
          </ul>
          <p className="mt-5 rounded-lg bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            Four-digit PINs are weak and intended only for this demo.
            Authentication is not implemented.
          </p>
        </aside>
      </div>
    </main>
  );
}
