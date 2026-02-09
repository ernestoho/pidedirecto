# Monorepo structure

This repository is structured as a multi-app monorepo to support the customer, admin, restaurant, and rider experiences along with shared packages and backend services.

```
apps/
  customer-web/         # Customer PWA Web storefront
  customer-mobile/      # Customer PWA Mobile
  admin-dashboard/      # Admin Dashboard PWA
  restaurant-tablet/    # Restaurant Tablet/Staff PWA
  rider-app/            # Rider PWA
packages/
  ui/                   # Shared UI components
  utils/                # Shared utilities/helpers
  api-client/           # Shared API client (REST/GraphQL)
  auth/                 # Auth helpers, token utilities, RBAC helpers
  config/               # Shared configuration/env helpers
services/
  api/                  # Backend API service
  worker/               # Background jobs/queues
```

## Notes
- Each app/package/service contains its own README placeholder to guide future implementation.
- Future build tooling can be added with Turborepo or Nx depending on team preference.
