# ⚡️ @uniqweber/express-starter-cli

[![npm version](https://img.shields.io/npm/v/@uniqweber/express-starter-cli.svg?style=flat-color&color=cyan)](https://www.npmjs.com/package/@uniqweber/express-starter-cli)
[![NPM Downloads](https://img.shields.io/npm/dm/@uniqweber/express-starter-cli.svg?style=flat-color&color=blue)](https://www.npmjs.com/package/@uniqweber/express-starter-cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An enterprise-grade, production-ready **Domain-Driven Design (DDD)** boilerplate generator for **ExpressJS** and **TypeScript**, heavily inspired by NestJS. 

Build highly modular, clean, and scalable Node.js APIs in literally 5 seconds!

---

## 🧠 What is Domain-Driven Design (DDD)?

Traditional Node.js/Express starter boilerplates use the standard **MVC (Model-View-Controller)** pattern. In MVC, all controllers go into a `controllers/` folder, all routes in `routes/`, and all models in `models/`. 

As your application grows, finding code becomes a nightmare because a single feature (e.g., `user`) is scattered across 5 different folders!

### The DDD Approach (Feature-First Architecture)
**Domain-Driven Design (DDD)** solves this by organizing code by **Business Domain (Features)** instead of technical types. 

In a DDD architecture, everything related to a single domain (like `auth`, `user`, or `payment`) lives inside one isolated folder:

```text
src/domains/user/
├── user.route.ts       # Chained Express functional routes
├── user.controller.ts  # Functional RequestHandlers (pre-wired with try/catch)
├── user.service.ts     # OOP Class-based service containing business logic
├── user.interface.ts   # Strict TypeScript Interfaces and DTOs
└── user.schema.ts      # SQL/NoSQL query storage isolated from logic
```

### Why is DDD so powerful?
*   **Scale Without Chaos:** You can have 100 features, and your folder structure stays perfectly clean and easy to navigate.
*   **True Modularity:** You can easily delete, modify, or rewrite a feature without touching or breaking other parts of the application.
*   **Functional + OOP Synergy:** This boilerplate utilizes high-performance **functional controllers** for HTTP endpoints and **OOP Class-based services** for clean data mapping and dependency injection.

---

## 🚀 How to Use (Choose Your Favorite Way)

This is a **pure CLI tool**, not a library to be imported in your code. You can run it either directly on-the-fly or install it globally on your system.

### Option A: Run Instantly (No Installation)
Run this command using your favorite package manager to scaffold a new project right away:

| Package Manager | Command |
| :--- | :--- |
| **npm** | `npx @uniqweber/express-starter-cli new my-awesome-api` |
| **pnpm** | `pnpm dlx @uniqweber/express-starter-cli new my-awesome-api` |
| **yarn** | `yarn dlx @uniqweber/express-starter-cli new my-awesome-api` |
| **bun** | `bunx @uniqweber/express-starter-cli new my-awesome-api` |

---

### Option B: Install Globally (Recommended for Daily Use)
If you build APIs frequently, install it globally on your computer so the `express-starter` command is always available at your fingertips:

| Package Manager | Install Command | Scaffolding Command |
| :--- | :--- | :--- |
| **npm** | `npm install -g @uniqweber/express-starter-cli` | `express-starter new my-awesome-api` |
| **pnpm** | `pnpm add -g @uniqweber/express-starter-cli` | `express-starter new my-awesome-api` |
| **yarn** | `yarn global add @uniqweber/express-starter-cli` | `express-starter new my-awesome-api` |
| **bun** | `bun add -g @uniqweber/express-starter-cli` | `express-starter new my-awesome-api` |

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

Enjoy building beautiful, functional, and enterprise-grade Express APIs! 🚀
