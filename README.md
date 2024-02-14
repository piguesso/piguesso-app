This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Migrations
There are four different commands to handle migrations. You can either auto-generate migrations, run them, drop them, or check if there are any critical intersections between migrations.
### Auto-generate migrations
This command will automatically create migrations from the changes made in schema files. So, whenever you change something in schema files, please run this command to avoid issues.
```bash
npm run migration:create
```
### Run migrations
After creating the migrations, they should be run to use it and reflect the new structure in the database.
```bash
npm run migration:run
```
### Drop migrations
With this command, you can delete previously created migrations. The command will let you choose which migration to drop, aka delete. <br/>
⚠️ **Be aware when using this command, because you shouldn't delete migrations that have already been run by someone.**
```bash
npm run migration:drop
```
### Check migrations
This command will check if there are any incompatibilities with other migrations.
```bash
npm run migration:check
```
