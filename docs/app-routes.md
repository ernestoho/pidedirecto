# UI routes by app

This document outlines the initial UI route map for each application in the multi-app monorepo.

## Customer PWA Web (`apps/customer-web`)
- `/` — Home / discovery
- `/search` — Search results
- `/restaurants/:slug` — Restaurant storefront
- `/restaurants/:slug/menu` — Menu section anchor (optional)
- `/cart` — Cart review
- `/checkout` — Checkout flow
- `/orders` — Order history
- `/orders/:orderId` — Order details & tracking
- `/favorites` — Favorites
- `/offers` — Promotions & coupons
- `/profile` — Profile overview
- `/profile/addresses` — Manage addresses
- `/profile/payments` — Saved payment methods
- `/profile/settings` — Preferences
- `/support` — Support / help center
- `/auth/login` — Login
- `/auth/register` — Register
- `/auth/forgot-password` — Password reset

## Customer PWA Mobile (`apps/customer-mobile`)
- `/` — Home / discovery
- `/search` — Search results
- `/restaurants/:slug` — Restaurant storefront
- `/cart` — Cart review
- `/checkout` — Checkout flow
- `/orders` — Order history
- `/orders/:orderId` — Order details & tracking
- `/favorites` — Favorites
- `/profile` — Profile overview
- `/profile/addresses` — Manage addresses
- `/profile/settings` — Preferences
- `/support` — Support
- `/auth/login` — Login
- `/auth/register` — Register
- `/auth/forgot-password` — Password reset

## Admin Dashboard PWA (`apps/admin-dashboard`)
- `/` — Overview dashboard
- `/auth/login` — Admin login
- `/tenants` — Tenants list
- `/tenants/:tenantId` — Tenant detail
- `/users` — Users list
- `/users/:userId` — User detail
- `/restaurants` — Restaurant list
- `/restaurants/:restaurantId` — Restaurant detail
- `/orders` — Orders list
- `/orders/:orderId` — Order detail
- `/riders` — Riders list
- `/riders/:riderId` — Rider detail
- `/payouts` — Payouts & settlements
- `/promotions` — Promotions & coupons
- `/support` — Support tickets
- `/settings` — Platform settings
- `/analytics` — Reports & analytics

## Restaurant Tablet/Staff PWA (`apps/restaurant-tablet`)
- `/` — Incoming orders board
- `/auth/login` — Restaurant login
- `/orders` — Orders list
- `/orders/:orderId` — Order detail
- `/menu` — Menu management
- `/menu/:itemId` — Menu item detail
- `/inventory` — Inventory status
- `/staff` — Staff management
- `/profile` — Restaurant profile
- `/reports` — Restaurant reports
- `/settings` — Restaurant settings

## Rider PWA (`apps/rider-app`)
- `/` — Assigned orders / queue
- `/auth/login` — Rider login
- `/orders` — Orders list
- `/orders/:orderId` — Delivery detail
- `/navigation/:orderId` — Turn-by-turn navigation
- `/earnings` — Earnings summary
- `/history` — Delivery history
- `/profile` — Rider profile
- `/availability` — Availability toggle
- `/support` — Support
