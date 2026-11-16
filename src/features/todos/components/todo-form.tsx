import { addTodo } from "../actions";

export default function TodoForm() {
  return (
    <form action={addTodo} className="flex flex-col gap-3 sm:flex-row">
      <label className="sr-only" htmlFor="todo-title">
        Todo title
      </label>
      <input
        id="todo-title"
        name="title"
        type="text"
        placeholder="What needs to be done?"
        maxLength={160}
        required
        className="min-w-0 flex-1 rounded-lg border border-slate-300 px-3 py-2.5 text-slate-950 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
      />
      <button
        type="submit"
        className="rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
      >
        Add todo
      </button>
    </form>
  );
}
