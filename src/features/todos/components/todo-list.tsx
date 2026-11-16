import { deleteTodo, toggleTodo } from "../actions";
import type { Todo } from "../model";

export default function TodoList({ todos }: { todos: Todo[] }) {
  if (todos.length === 0) {
    return (
      <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">
        No todos yet. Add one above to get started.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-slate-200">
      {todos.map((todo) => (
        <li
          key={todo.id}
          className="flex flex-wrap items-center justify-between gap-3 py-4 first:pt-0 last:pb-0"
        >
          <div className="min-w-0 flex-1">
            <p
              className={`break-words font-medium ${
                todo.completed
                  ? "text-slate-400 line-through"
                  : "text-slate-900"
              }`}
            >
              {todo.title}
            </p>
            <time
              dateTime={todo.createdAt}
              className="mt-1 block text-xs text-slate-500"
            >
              Added {new Date(todo.createdAt).toLocaleString()}
            </time>
          </div>

          <div className="flex items-center gap-2">
            <form action={toggleTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <input
                type="hidden"
                name="completed"
                value={String(!todo.completed)}
              />
              <button
                type="submit"
                className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {todo.completed ? "Reopen" : "Complete"}
              </button>
            </form>
            <form action={deleteTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <button
                type="submit"
                className="rounded-md border border-rose-200 px-3 py-1.5 text-sm font-medium text-rose-700 hover:bg-rose-50"
              >
                Delete
              </button>
            </form>
          </div>
        </li>
      ))}
    </ul>
  );
}
