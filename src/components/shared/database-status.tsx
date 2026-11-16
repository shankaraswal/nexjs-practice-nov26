import { connection } from "next/server";
import { getMongoClient } from "@/lib/mongodb";

type DatabaseStatusResult =
  | { connected: true; databaseName: string }
  | { connected: false };

async function getDatabaseStatus(): Promise<DatabaseStatusResult> {
  try {
    const client = await getMongoClient();
    const database = client.db();
    await database.command({ ping: 1 });
    return { connected: true, databaseName: database.databaseName };
  } catch (error) {
    console.error("MongoDB status check failed:", error);
    return { connected: false };
  }
}

export async function DatabaseStatus() {
  await connection();
  const result = await getDatabaseStatus();

  return (
    <header
      role="status"
      className={`flex min-h-12 items-center justify-center gap-2 px-4 py-2 text-sm font-medium ${
        result.connected
          ? "bg-emerald-50 text-emerald-900"
          : "bg-rose-50 text-rose-900"
      }`}
    >
      <span
        aria-hidden="true"
        className={`size-2 rounded-full ${
          result.connected ? "bg-emerald-500" : "bg-rose-500"
        }`}
      />
      <span>
        App server running
        {" · "}
        {result.connected
          ? `MongoDB connected (${result.databaseName})`
          : "MongoDB unavailable"}
      </span>
    </header>
  );
}

export function DatabaseStatusFallback() {
  return (
    <header
      role="status"
      className="flex min-h-12 items-center justify-center gap-2 bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600"
    >
      <span
        aria-hidden="true"
        className="size-2 animate-pulse rounded-full bg-slate-400"
      />
      Checking server and database...
    </header>
  );
}
