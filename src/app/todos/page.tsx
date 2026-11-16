import { Suspense } from "react";
import { connection } from "next/server";
import TodoForm from "@/features/todos/components/todo-form";
import TodoList from "@/features/todos/components/todo-list";
import { getTodos } from "@/features/todos/data";

async function loadTodos() {
  try {
    return { success: true as const, todos: await getTodos() };
  } catch (error) {
    console.error("Todo list load failed:", error);
    return { success: false as const };
  }
}

async function TodoItems() {
  await connection();
  const result = await loadTodos();

  if (!result.success) {
    return (
      <p className="rounded-lg bg-rose-50 p-4 text-sm text-rose-800">
        Could not load todos. Check the database connection and try again.
      </p>
    );
  }

  return <TodoList todos={result.todos} />;
}

function TodoListFallback() {
  return (
    <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
      Loading todos...
    </p>
  );
}

export default function TodoPage() {
  return (
    <main className="flex-1 bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700">
            Todo feature
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            My todos
          </h1>
          <p className="mt-2 text-slate-600">
            Add tasks, mark them complete, or remove them.
          </p>
        </header>

        <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold text-slate-950">
            Add a todo
          </h2>
          <TodoForm />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-xl font-semibold text-slate-950">
            Todo list
          </h2>
          <Suspense fallback={<TodoListFallback />}>
            <TodoItems />
          </Suspense>
        </section>

        <aside className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            How this feature works
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <li>
              <strong className="text-slate-900">Route:</strong>{" "}
              <code>src/app/todos/page.tsx</code> renders the page and loads the
              todo list as a Server Component.
            </li>
            <li>
              <strong className="text-slate-900">Model:</strong>{" "}
              <code>src/features/todos/model.ts</code> defines the todo document
              and page-facing types.
            </li>
            <li>
              <strong className="text-slate-900">Data Access Layer:</strong>{" "}
              <code>src/features/todos/data.ts</code> contains the MongoDB
              collection reads and writes.
            </li>
            <li>
              <strong className="text-slate-900">Server Actions:</strong>{" "}
              <code>src/features/todos/actions.ts</code> validates form input,
              calls the data functions, and refreshes this route.
            </li>
          </ul>
          <p className="mt-5 text-sm leading-6 text-slate-600">
            This project uses the MongoDB Node.js driver. The model files are
            TypeScript shapes; they are not Mongoose schemas or automatic
            database rules.
          </p>
        </aside>
      </div>
    </main>
  );
}
