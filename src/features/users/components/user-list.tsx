"use client";

import { useEffect, useState } from "react";
import type { PublicUser } from "../model";

type UserListState = "loading" | "ready" | "error";

function isPublicUser(value: unknown): value is PublicUser {
  return (
    typeof value === "object" &&
    value !== null &&
    "id" in value &&
    typeof value.id === "string" &&
    "name" in value &&
    typeof value.name === "string" &&
    "createdAt" in value &&
    typeof value.createdAt === "string"
  );
}

function isUsersResponse(
  value: unknown,
): value is { users: PublicUser[] } {
  return (
    typeof value === "object" &&
    value !== null &&
    "users" in value &&
    Array.isArray(value.users) &&
    value.users.every(isPublicUser)
  );
}

export default function UserList() {
  const [users, setUsers] = useState<PublicUser[]>([]);
  const [state, setState] = useState<UserListState>("loading");

  useEffect(() => {
    let active = true;

    async function loadUsers() {
      try {
        const response = await fetch("/api/users", { cache: "no-store" });

        if (!response.ok) {
          throw new Error(`User API returned HTTP ${response.status}`);
        }

        const payload: unknown = await response.json();
        if (!isUsersResponse(payload)) {
          throw new Error("User API response has an invalid shape");
        }

        if (active) {
          setUsers(payload.users);
          setState("ready");
        }
      } catch (error) {
        console.error("Could not load the user list:", error);
        if (active) {
          setState("error");
        }
      }
    }

    void loadUsers();

    return () => {
      active = false;
    };
  }, []);

  if (state === "loading") {
    return <p className="text-sm text-slate-500">Loading users...</p>;
  }

  if (state === "error") {
    return (
      <p role="alert" className="rounded-lg bg-rose-50 p-4 text-sm text-rose-800">
        Could not load users. Check the database connection and try again.
      </p>
    );
  }

  if (users.length === 0) {
    return (
      <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
        No users are registered yet.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-slate-200">
      {users.map((user) => (
        <li
          key={user.id}
          className="flex flex-wrap items-center justify-between gap-2 py-4 first:pt-0 last:pb-0"
        >
          <span className="font-medium text-slate-900">{user.name}</span>
          <time
            dateTime={user.createdAt}
            className="text-sm text-slate-500"
          >
            Joined {new Date(user.createdAt).toLocaleDateString()}
          </time>
        </li>
      ))}
    </ul>
  );
}
