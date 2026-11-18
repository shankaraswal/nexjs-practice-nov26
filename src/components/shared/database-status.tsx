"use client";

import { useEffect, useState } from "react";

type DatabaseStatusResult =
  | { connected: null }
  | { connected: true; databaseName: string }
  | { connected: false };

export function DatabaseStatus() {
  const [result, setResult] = useState<DatabaseStatusResult>({ connected: null });

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    let active = true;

    async function checkStatus() {
      try {
        const response = await fetch("/api/health/db", {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`MongoDB health check returned ${response.status}`);
        }
        const data: unknown = await response.json();
        if (
          typeof data !== "object" ||
          data === null ||
          !("database" in data) ||
          typeof data.database !== "string"
        ) {
          throw new Error("Invalid MongoDB health check response");
        }
        if (active) {
          setResult({ connected: true, databaseName: data.database });
        }
      } catch (error) {
        if (active) {
          console.error("MongoDB status check failed:", error);
          setResult({ connected: false });
        }
      } finally {
        clearTimeout(timeout);
      }
    }

    void checkStatus();
    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  if (result.connected === null) {
    return <DatabaseStatusFallback />;
  }

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
