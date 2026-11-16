import { Suspense } from "react";
import { connection } from "next/server";

import PostForm from "@/features/posts/components/PostForm";
import PostList from "@/features/posts/components/PostList";
import { getPosts } from "@/features/posts/data";

async function loadPosts() {
  try {
    return await getPosts();
  } catch (error) {
    console.error("Post list load failed:", error);
    return null;
  }
}

async function PostItems() {
  await connection();
  const posts = await loadPosts();

  if (posts === null) {
    return (
      <p className="rounded-lg bg-rose-50 p-4 text-sm text-rose-800">
        Could not load posts. Check the database connection and try again.
      </p>
    );
  }

  return <PostList posts={posts} />;
}

function PostListFallback() {
  return (
    <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
      Loading posts...
    </p>
  );
}

export default function PostsPage() {
  return (
    <main className="flex-1 bg-slate-100 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        {/* Page Header */}
        <header className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-700">
            Posts feature
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            My posts
          </h1>

          <p className="mt-2 text-slate-600">
            Create and manage your posts with MongoDB.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Create Post Form */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-slate-950">
              Create a post
            </h2>

            <PostForm />
          </section>

          {/* Posts List */}
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-5 text-xl font-semibold text-slate-950">
              Posts list
            </h2>

            <Suspense fallback={<PostListFallback />}>
              <PostItems />
            </Suspense>
          </section>
        </div>

        {/* Feature Information */}
        <aside className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">
            How this feature works
          </h2>

          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <li>
              <strong className="text-slate-900">Route:</strong>{" "}
              <code>src/app/posts/page.tsx</code> renders the Posts page and
              loads posts using a Server Component.
            </li>

            <li>
              <strong className="text-slate-900">Model:</strong>{" "}
              <code>src/features/posts/model.ts</code> defines Post types.
            </li>

            <li>
              <strong className="text-slate-900">Data Access Layer:</strong>{" "}
              <code>src/features/posts/data.ts</code> handles MongoDB
              operations.
            </li>

            <li>
              <strong className="text-slate-900">Server Actions:</strong>{" "}
              <code>src/features/posts/actions.ts</code> handles post creation.
            </li>

            <li>
              <strong className="text-slate-900">Components:</strong>{" "}
              <code>src/features/posts/components/</code> contains PostForm and
              PostList.
            </li>
          </ul>

          <p className="mt-5 text-sm leading-6 text-slate-600">
            This project uses the MongoDB Native Driver with TypeScript. No
            Mongoose or Zod is used.
          </p>
        </aside>
      </div>
    </main>
  );
}
