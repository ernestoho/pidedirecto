# PideDirecto Multi-App Platform

A multi-tenant, multi-vendor delivery platform built as a monorepo with five PWA experiences: Customer Web, Customer Mobile, Admin Dashboard, Restaurant Tablet/Staff, and Rider app.

## Workspace Layout

```
apps/
  customer-web/         # Customer PWA Web storefront (Next.js)
  customer-mobile/      # Customer PWA Mobile (Next.js)
  admin-dashboard/      # Admin Dashboard PWA (Next.js)
  restaurant-tablet/    # Restaurant Tablet/Staff PWA (Next.js)
  rider-app/            # Rider PWA (Next.js)
packages/
  ui/                   # Shared UI primitives
  utils/                # Shared utilities
  api-client/           # API client and typed SDKs
  auth/                 # Auth helpers and RBAC utilities
  config/               # Shared config helpers
services/
  api/                  # Backend API service (NestJS/Express)
  worker/               # Background worker service
```

## Getting Started

This repo is designed for pnpm + Turborepo.

```bash
pnpm install
pnpm dev
```

Each app has its own `dev` script and can be run independently:

```bash
pnpm --filter @pidedirecto/customer-web dev
```

## Docs

- `docs/app-routes.md` for initial route mapping
- `docs/database-schema.md` for the proposed PostgreSQL schema
- `docs/build-checklist.md` for the delivery plan checklist
- `docs/monorepo-structure.md` for repo layout details
