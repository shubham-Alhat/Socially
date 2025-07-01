- ✅ PostgreSQL (the database)
- ✅ Neon (hosting the DB)
- ✅ Prisma (the ORM)
- ✅ Next.js (your app)

---

## 🛠 Step 1: Set Up PostgreSQL on Neon

1. Go to [https://neon.tech](https://neon.tech)
2. **Sign up or log in**
3. Click **“New Project”**
4. Fill details:

   - **Project name:** e.g., `socially-db`
   - **Database name:** e.g., `socially`
   - **Region:** `AWS Asia Pacific 1 (Singapore)` (closest to Pune)
   - **Cloud Provider:** AWS ✅

5. Click **“Create Project”**

Neon will generate a **PostgreSQL URL** like this:

```
postgresql://username:password@host.neon.tech/dbname?sslmode=require
```

Save this — you’ll use it in `.env`.

---

## 🛠 Step 2: Setup Your Next.js App

If you haven't already:

```bash
npx create-next-app@latest my-app
cd my-app
```

---

## 🛠 Step 3: Install Prisma

```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```

This creates:

- `prisma/schema.prisma` → where you define your models
- `.env` → put your DB URL here

---

## 🛠 Step 4: Paste the Database URL in `.env`

Open `.env` and replace the existing one:

```env
DATABASE_URL="postgresql://username:password@host.neon.tech/dbname?sslmode=require"
```

Make sure to paste **only the connection string**, not `psql ...`.

---

## 🛠 Step 5: Define a Simple Model

Edit `prisma/schema.prisma` like this:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
}
```

---

## 🛠 Step 6: Push to Database

This creates tables in your Neon DB:

```bash
npx prisma db push
```

If it works, ✅ you're connected.

---

## 🛠 Step 7: Use Prisma in Code

Example API route `/app/api/users/route.ts`:

```ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const users = await prisma.user.findMany();
  return Response.json(users);
}
```

---

### ✅ Done!

Your app now:

- Connects to Neon DB
- Uses Prisma to query
- Can create real-world schemas like User, Post, Comments next

---

Now we have to create a file in `src/lib`named **prisma.ts**. and search on google prisma in nextjs best practices.

from there somewhere we got to know that we encounter error with that. so that why we copy code and paste in prisma.ts. **From that we got `prisma` instance that we used to call db.**

### Error occured `not yet initialze prisma client`

You are generating your Prisma client to folder prisma (custom output), not the default client folder.

And we are import like `import { PrismaClient } from "@prisma/client";`

- but your generated clients is in folder prisma, not in folder client.
- So, `@prisma/client` is not initialized and you get the error.

### How to fix it - Use default output

Change your generator client block in `schema.prisma` to and ran cmd to generate prisma client:

#### the error JS block

```javascript
generator client {
  provider = "prisma-client-js"
  output = "../src/generated/prisma"   // this is where ERROR is COMING FROM
}
```

corrected code block `schema.prisma` file.

```javascript
generator client {
  provider = "prisma-client-js"
  // Remove the output line to use the default location
}
```

Then run following cmd

```bash
npx prisma generate
```

The error will fix now

2:27
