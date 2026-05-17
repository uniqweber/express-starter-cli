# ⚡️ @uniqweber/express-starter

A ultra-premium, production-ready **Domain-Driven Design (DDD)** boilerplate generator for ExpressJS, inspired by NestJS. 

Even if you are starting your coding journey today, this tool will help you set up and build a massive scale ExpressJS API in literally 5 seconds!

---

## 🚀 Quick Start (Create a New Project)

No installation required! Just run this command in your terminal to create your new project:

```bash
npx @uniqweber/express-starter new my-awesome-api
```

It will:
1. Create a folder named `my-awesome-api`.
2. Copy over our beautiful, premium starter codebase.
3. Automatically install all dependencies for you using `pnpm`!
4. Initialize a fresh Git repository.

---

## 🏃‍♂️ How to Run Your Project

Once your project is created:

1. Move into your new project folder:
   ```bash
   cd my-awesome-api
   ```
2. Start the hot-reloading development server:
   ```bash
   pnpm dev
   ```

---

## 🛠 Generating New Domains (Like magic!)

We hate writing boilerplate files manually. With this CLI, you can generate a brand new domain module (Router, Controller, Service, DTO Interfaces, and SQL Schema file) with a single command!

Inside your project folder, just run:

```bash
pnpm g user
```
*(Or use `npm run g user` / `yarn g user`)*

### What it instantly builds for you:
*   📁 `src/domains/user/user.route.ts` - Clean, chained functional router.
*   📁 `src/domains/user/user.controller.ts` - Functional RequestHandlers pre-wired with safe try/catch structures.
*   📁 `src/domains/user/user.service.ts` - An OOP Service Class to write your database queries.
*   📁 `src/domains/user/user.interface.ts` - Ready-made TypeScript data interfaces and DTOs.
*   📁 `src/domains/user/user.schema.ts` - SQL/Database query storage so your code stays neat.

After running the command, just copy the custom code box printed in your terminal and paste it into `src/app.ts` to register your new route!

---

## 📁 The Project Structure (DDD)

We organize code by **Features** (Domains) instead of putting all routes or controllers in giant single files. Here is what your project looks like:

```text
src/
├── config/          # Environment variables, database credentials, and logger setups
├── domains/         # All of your features (e.g. system, user, auth)
│   └── system/      # Built-in health check and landing pages
├── libs/            # External integrations (e.g. Prisma, Firebase, Payment Gateways)
├── middlewares/     # Express Middlewares (e.g. Error handling, Auth guards)
├── shared/          # Shared values, types, and constants
└── utils/           # Small helper functions (e.g. date formatters)
```

---

## ⚠️ Important Restrictions (Please Read!)

To keep your code extremely clean and fast, this CLI has a few rules:

1. **You MUST use `pnpm`:** 
   Our CLI installs dependencies using `pnpm`. If you don't have it installed, run this command first globally:
   ```bash
   npm install -g pnpm
   ```
2. **Node.js Version:**
   Requires Node.js version 18 or higher.
3. **Run generator inside the project:**
   The `pnpm g` (or `generate`) command must be run **inside** your generated project folder. It looks upwards for a `package.json` file to know where your project root is. If you run it outside your project, it will fail safely and let you know!
4. **TypeScript Strictness:**
   This boilerplate comes with premium, professional-grade strict TypeScript and ESLint rule mappings out of the box. Unused variables (except those starting with `_`) will show compile-time errors to keep your code perfectly optimized!

---

## 👤 Author
*   **Rayan (uniqweber)** - [GitHub](https://github.com/uniqweber)

Enjoy building beautiful, functional APIs! 🚀
