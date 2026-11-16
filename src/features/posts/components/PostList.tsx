import type { Post } from "../model";

interface PostListProps {
  posts: Post[];
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No posts found. Create your first post!
      </p>
    );
  }

  return (
    <div
      role="region"
      aria-label="Posts list"
      tabIndex={0}
      className="max-h-96 space-y-2 overflow-y-auto"
    >
      {posts.map((post) => (
        <article
          key={post._id}
          className="rounded-lg border border-slate-200 p-3"
        >
          <h3 className="wrap-break-word text-sm font-semibold text-slate-900">
            {post.title}
          </h3>

          <p className="mt-1 wrap-break-word text-sm text-slate-600">
            {post.description}
          </p>

          <div className="mt-2 flex flex-wrap justify-between gap-x-2 gap-y-1 text-xs text-slate-500">
            <span className="break-all">By {post.userName}</span>
            <span>{new Date(post.createdAt).toLocaleString()}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
