export default async function UsersPage() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const users = await response.json();

  return (
    <main className="flex-1 bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700">
            Directory
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Users Directory
          </h1>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {users.map((user) => (
            <div
              key={user.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h3 className="font-semibold text-slate-950">{user.name}</h3>
              <p className="text-sm text-slate-600">{user.email}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
