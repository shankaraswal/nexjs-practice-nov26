# nexjs-practice-nov26

Next.js App Router POC using the MongoDB Node.js driver.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and set `MONGODB_URI`. Keep this file
   private; it is ignored by Git.

3. In MongoDB Atlas, allow your development IP address and create a database
   user with the required permissions.

4. Start the app:

   ```bash
   npm run dev
   ```

The top banner shows whether the app can reach MongoDB.

## Simple folder guide

```text
src/
├── app/                  # URLs and API endpoints (Next.js routes)
│   ├── api/              # HTTP APIs: route.ts
│   ├── users/page.tsx
│   ├── products/page.tsx
│   ├── todos/page.tsx
│   ├── page.tsx          # POC overview
│   └── layout.tsx        # Shared status banner and navigation
├── features/             # Code grouped by feature
│   ├── users/
│   │   ├── model.ts      # User document and public response types
│   │   ├── data.ts       # User collection reads/writes (DAL)
│   │   ├── actions.ts    # Registration Server Action
│   │   └── components/   # Registration form and user list
│   ├── products/
│   │   ├── model.ts      # Product document and display types
│   │   ├── data.ts       # Product collection reads/writes (DAL)
│   │   ├── actions.ts    # Add-product Server Action
│   │   └── components/   # Product form
│   └── todos/
│       ├── model.ts      # Todo document and display types
│       ├── data.ts       # Todo collection reads/writes (DAL)
│       ├── actions.ts    # Add, complete, and delete Server Actions
│       └── components/   # Todo form and list
├── components/shared/    # UI reused across multiple features/pages
└── lib/                  # Shared infrastructure, not feature data
    ├── mongodb.ts        # Reuses the MongoDB connection
    └── password.ts       # Hashes registration PINs
```

Each feature folder (`users`, `products`, `todos`) follows the same pattern:

1. `model.ts` describes the data shape and TypeScript types.
2. `data.ts` reads/writes that feature's MongoDB collection.
3. `actions.ts` validates submitted form data, calls `data.ts`, and refreshes
   the page when needed.
4. `components/` contains the feature's forms and lists.
5. `app/<feature>/page.tsx` maps the URL to the page and combines components.

This project uses the native MongoDB driver, not Mongoose. Therefore `model.ts`
contains TypeScript types, not a Mongoose schema or automatic MongoDB
validation. Server Actions validate input before calling the data layer.
MongoDB stores records in the `users`, `products`, and `todos` collections.

## Routes

- `/` — POC overview, route map, tech stack, and connection status.
- `/users` — user registration and public user list.
- `/products` — add and browse products.
- `/todos` — add, complete, and delete todos.
- `/api/users` — returns up to 100 public user records (name and registration
  date only; never email or PIN hash).
- `/api/health/db` — JSON MongoDB connection check.

Registration, user listing, product management, and todos are open demo
features. Four-digit PINs are weak. Add authentication, authorization, and rate
limiting before exposing the app publicly or using real personal data.

Product prices are stored as integer minor units with two decimal places. The
app does not assume a currency.

Never expose `MONGODB_URI` through a `NEXT_PUBLIC_` variable. For deployment,
set it in the hosting provider's environment-variable settings.
