# Prisma & SQLite Setup Guide

## 1. Create the Database Package

```sh
mkdir -p packages/database
cd packages/database
pnpm init
```

## 2. Edit `package.json`

Update the package.json file as needed, then install dependencies:

```sh
pnpm install
```

## 3. Initialize Prisma and SQLite

```sh
pnpm exec prisma init --datasource-provider sqlite
```

## 4. Update `prisma/schema.prisma`

Modify `packages/database/prisma/schema.prisma` as needed.

## 5. Run Prisma Commands

```sh
pnpm prisma generate
pnpm prisma migrate dev
```

## 6. Export Prisma Client

Create the `src` directory and setup Prisma client:

```sh
mkdir -p packages/database/src
```

## 7. Run the Prisma Seed Script

```sh
pnpm exec prisma db seed
```

## 8. Verify Data in SQLite

```sh
pnpm exec sqlite3 packages/database/prisma/dev.db
SELECT * FROM User;
```

### Example Output

```sh
❯ pnpm exec sqlite3 packages/database/prisma/dev.db

SQLite version 3.43.2 2023-10-10 13:08:14
Enter ".help" for usage hints.
sqlite> SELECT * FROM User;
f09c1b9a-0274-4048-b1fa-47fa664fcf85|Alice|alice@example.com
a074e183-0aee-4cff-a3c9-5ed6415578ed|Bob|bob@example.com
e4098436-88a4-4513-8340-cf9d64e55b9b|Charlie|charlie@example.com
sqlite>
```
