import { Suspense } from "react";
import { getQuotes } from "@/features/quotes/data";

async function QuoteList() {
  const quotes = await getQuotes();

  if (quotes.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-lg font-medium text-slate-700">No quotes found</p>
        <p className="mt-2 text-sm text-slate-500">
          Check back later for some inspiration.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {quotes.map((item) => (
        <article
          key={item.id}
          className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
        >
          <span className="text-4xl font-serif leading-none text-indigo-300">
            “
          </span>

          <p className="mt-3 text-lg leading-8 text-slate-700">{item.quote}</p>

          <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
              {item.author?.charAt(0) ?? "?"}
            </div>
            <div>
              <p className="font-semibold text-slate-800">{item.author}</p>
              <p className="text-xs text-slate-400">Quote author</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function QuoteListFallback() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="h-56 animate-pulse rounded-2xl bg-slate-200"
        />
      ))}
    </div>
  );
}

export default function QuotesPage() {
  return (
    <main className="flex-1 bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700">
            Daily Inspiration
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            Quotes
          </h1>
          <p className="mt-2 text-slate-600">
            A collection of thoughtful quotes to inspire your day, motivate your
            journey, and bring fresh perspectives.
          </p>
        </header>

        <Suspense fallback={<QuoteListFallback />}>
          <QuoteList />
        </Suspense>

        <footer className="mt-8 text-sm text-slate-400">
          A little inspiration goes a long way.
        </footer>
      </div>
    </main>
  );
}
