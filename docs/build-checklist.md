# Step-by-step build checklist

Use this checklist to guide initial implementation of the multi-app, multi-vendor platform.

## 1) Monorepo foundation
- [ ] Choose monorepo tooling (Turborepo or Nx) and configure workspace
- [ ] Add root package manager config (pnpm/yarn/npm) and workspace settings
- [ ] Add shared linting/formatting (ESLint, Prettier)
- [ ] Add CI pipeline (lint, test, build)

## 2) Backend API foundation
- [ ] Select backend framework (NestJS/Express)
- [ ] Provision PostgreSQL + Redis instances
- [ ] Implement database migrations (Prisma/TypeORM/Knex)
- [ ] Implement auth (JWT, refresh tokens, RBAC)
- [ ] Implement multi-tenant routing (tenant by domain or header)

## 3) Core domain services
- [ ] Tenants & settings service
- [ ] Users & roles service
- [ ] Restaurants & staff management service
- [ ] Catalog/menu service
- [ ] Orders & payments service
- [ ] Dispatch & rider tracking service
- [ ] Notifications service (push/email/SMS)

## 4) Shared packages
- [ ] Create UI component library
- [ ] Create API client package
- [ ] Create shared auth utilities
- [ ] Create shared config utilities

## 5) Customer PWA Web
- [ ] Set up Next.js app shell with PWA configuration
- [ ] Implement discovery & search
- [ ] Implement restaurant storefront & menu
- [ ] Implement cart & checkout
- [ ] Implement order tracking
- [ ] Implement profile & addresses

## 6) Customer PWA Mobile
- [ ] Set up mobile-optimized PWA shell
- [ ] Implement core flows (search, menu, checkout)
- [ ] Implement order tracking & history
- [ ] Implement offline caching

## 7) Admin Dashboard PWA
- [ ] Set up admin dashboard shell
- [ ] Implement restaurant onboarding & management
- [ ] Implement user management
- [ ] Implement order monitoring & overrides
- [ ] Implement payouts & commission controls
- [ ] Implement reporting & analytics

## 8) Restaurant Tablet/Staff PWA
- [ ] Set up restaurant tablet shell
- [ ] Implement order queue & status updates
- [ ] Implement menu management
- [ ] Implement inventory controls
- [ ] Implement staff permissions

## 9) Rider PWA
- [ ] Set up rider app shell
- [ ] Implement assignment queue
- [ ] Implement delivery tracking & navigation
- [ ] Implement availability & earnings

## 10) Payments & notifications
- [ ] Integrate Stripe/PayPal
- [ ] Add webhooks for payment updates
- [ ] Add push notifications (FCM)
- [ ] Add email notifications

## 11) QA & observability
- [ ] Add unit tests per package/app
- [ ] Add end-to-end tests for critical flows
- [ ] Add logging & tracing (Sentry/OTel)
- [ ] Add performance monitoring

## 12) Deployment
- [ ] Create Vercel projects for each app
- [ ] Configure environment variables
- [ ] Configure domains and SSL
- [ ] Deploy backend services (container or managed)
- [ ] Run smoke tests on all apps
