# Multi-vendor delivery platform database schema (detailed)

This schema is designed for a multi-tenant, multi-vendor marketplace with customer, restaurant, rider, and admin apps.
It is organized for PostgreSQL and uses UUIDs for primary keys.

## Conventions
- **PK**: Primary key
- **FK**: Foreign key
- **UQ**: Unique constraint
- **IDX**: Index
- **ENUM**: PostgreSQL enum type
- All tables include `created_at`, `updated_at`, `deleted_at` (soft delete) unless stated.

## 1) Core tenancy & organizations

### `tenants`
Represents a marketplace instance (e.g., a brand operating multiple cities).
- `id` UUID PK
- `name` text
- `slug` text UQ
- `status` ENUM(`active`, `suspended`)
- `default_currency` char(3)
- `default_timezone` text
- `settings` jsonb (feature flags, UI config)
- `created_at`, `updated_at`, `deleted_at`

### `tenant_domains`
Maps custom domains to tenants (customer/admin apps).
- `id` UUID PK
- `tenant_id` UUID FK → tenants.id
- `app` ENUM(`customer`, `admin`, `restaurant`, `rider`)
- `domain` text UQ
- `is_primary` boolean
- `created_at`, `updated_at`, `deleted_at`

### `countries`, `regions`, `cities`, `zones`
Geographic hierarchy for delivery availability.
- `countries`: `id`, `iso_code`, `name`
- `regions`: `id`, `country_id` FK, `name`
- `cities`: `id`, `region_id` FK, `name`
- `zones`: `id`, `city_id` FK, `name`, `polygon` geometry, `is_active`
- Index: `zones(city_id)`

## 2) Identity & access control

### `users`
Single table for all user types.
- `id` UUID PK
- `tenant_id` UUID FK → tenants.id
- `email` text UQ (per tenant)
- `phone` text (nullable)
- `password_hash` text
- `role` ENUM(`customer`, `admin`, `restaurant_owner`, `restaurant_staff`, `rider`, `support`)
- `status` ENUM(`active`, `inactive`, `banned`)
- `name` text
- `avatar_url` text
- `email_verified_at` timestamp
- `phone_verified_at` timestamp
- Index: `(tenant_id, email)` unique

### `roles`
Optional fine-grained RBAC roles beyond base user role.
- `id` UUID PK
- `tenant_id` UUID FK
- `name` text
- `created_at`, `updated_at`, `deleted_at`

### `permissions`
- `id` UUID PK
- `name` text UQ (e.g., `orders.read`, `menu.write`)

### `role_permissions`
- `role_id` UUID FK → roles.id
- `permission_id` UUID FK → permissions.id
- PK: (`role_id`, `permission_id`)

### `user_roles`
- `user_id` UUID FK → users.id
- `role_id` UUID FK → roles.id
- PK: (`user_id`, `role_id`)

## 3) Vendor (restaurant) domain

### `restaurants`
- `id` UUID PK
- `tenant_id` UUID FK
- `owner_user_id` UUID FK → users.id
- `name` text
- `slug` text
- `description` text
- `status` ENUM(`pending`, `active`, `paused`, `suspended`)
- `phone` text
- `email` text
- `address_line1`, `address_line2`, `city`, `postal_code`
- `lat` numeric, `lng` numeric
- `zone_id` UUID FK → zones.id
- `min_order_amount` numeric
- `delivery_fee_base` numeric
- `delivery_fee_per_km` numeric
- `avg_prep_minutes` integer
- `tax_rate` numeric
- `rating_avg` numeric
- `rating_count` integer
- `commission_rate` numeric (override tenant default)
- `created_at`, `updated_at`, `deleted_at`
- IDX: `(tenant_id, slug)` UQ

### `restaurant_hours`
- `id` UUID PK
- `restaurant_id` UUID FK
- `day_of_week` smallint (0-6)
- `open_time` time
- `close_time` time
- `is_closed` boolean

### `restaurant_staff`
Maps staff to restaurants.
- `restaurant_id` UUID FK
- `user_id` UUID FK
- `role` ENUM(`manager`, `chef`, `cashier`, `staff`)
- PK: (`restaurant_id`, `user_id`)

### `restaurant_documents`
Onboarding docs.
- `id` UUID PK
- `restaurant_id` UUID FK
- `type` ENUM(`license`, `insurance`, `tax`)
- `file_url` text
- `verified_at` timestamp

## 4) Catalog & menu

### `categories`
- `id` UUID PK
- `tenant_id` UUID FK
- `name` text
- `sort_order` integer

### `restaurant_categories`
- `restaurant_id` UUID FK
- `category_id` UUID FK
- PK: (`restaurant_id`, `category_id`)

### `menu_sections`
- `id` UUID PK
- `restaurant_id` UUID FK
- `name` text
- `sort_order` integer
- `is_active` boolean

### `menu_items`
- `id` UUID PK
- `restaurant_id` UUID FK
- `section_id` UUID FK → menu_sections.id
- `name` text
- `description` text
- `image_url` text
- `base_price` numeric
- `is_active` boolean
- `is_featured` boolean
- `taxable` boolean
- `created_at`, `updated_at`, `deleted_at`

### `menu_item_variants`
- `id` UUID PK
- `menu_item_id` UUID FK
- `name` text
- `price_delta` numeric
- `is_default` boolean

### `menu_item_addons`
Defines addon groups (e.g., extra toppings).
- `id` UUID PK
- `menu_item_id` UUID FK
- `name` text
- `min_select` integer
- `max_select` integer
- `is_required` boolean

### `menu_item_addon_options`
- `id` UUID PK
- `addon_id` UUID FK → menu_item_addons.id
- `name` text
- `price_delta` numeric
- `is_active` boolean

### `inventory_items`
Optional inventory tracking.
- `id` UUID PK
- `restaurant_id` UUID FK
- `menu_item_id` UUID FK
- `quantity` integer
- `is_out_of_stock` boolean

## 5) Customer profiles & addresses

### `customer_profiles`
- `user_id` UUID PK FK → users.id
- `default_address_id` UUID FK → addresses.id
- `loyalty_points` integer
- `marketing_opt_in` boolean

### `addresses`
- `id` UUID PK
- `user_id` UUID FK
- `label` text (Home/Work)
- `address_line1`, `address_line2`, `city`, `postal_code`
- `lat` numeric, `lng` numeric
- `is_default` boolean

## 6) Cart & checkout

### `carts`
- `id` UUID PK
- `tenant_id` UUID FK
- `user_id` UUID FK
- `restaurant_id` UUID FK
- `status` ENUM(`active`, `abandoned`, `converted`)
- `subtotal`, `tax_total`, `delivery_fee`, `discount_total`, `total` numeric

### `cart_items`
- `id` UUID PK
- `cart_id` UUID FK
- `menu_item_id` UUID FK
- `variant_id` UUID FK → menu_item_variants.id
- `quantity` integer
- `unit_price` numeric

### `cart_item_addons`
- `cart_item_id` UUID FK
- `addon_option_id` UUID FK
- `price_delta` numeric
- PK: (`cart_item_id`, `addon_option_id`)

## 7) Orders & fulfillment

### `orders`
- `id` UUID PK
- `tenant_id` UUID FK
- `restaurant_id` UUID FK
- `customer_id` UUID FK → users.id
- `rider_id` UUID FK → users.id (nullable)
- `order_number` text
- `status` ENUM(`placed`, `accepted`, `preparing`, `ready`, `picked_up`, `delivered`, `cancelled`, `refunded`)
- `placed_at` timestamp
- `accepted_at` timestamp
- `prepared_at` timestamp
- `picked_up_at` timestamp
- `delivered_at` timestamp
- `cancelled_at` timestamp
- `subtotal`, `tax_total`, `delivery_fee`, `discount_total`, `tip_total`, `total` numeric
- `payment_status` ENUM(`pending`, `authorized`, `paid`, `failed`, `refunded`)
- `payment_method` ENUM(`card`, `paypal`, `cash`, `wallet`)
- `delivery_address_id` UUID FK → addresses.id
- `notes` text
- `created_at`, `updated_at`, `deleted_at`
- IDX: `(tenant_id, order_number)` UQ

### `order_items`
- `id` UUID PK
- `order_id` UUID FK
- `menu_item_id` UUID FK
- `variant_id` UUID FK
- `name_snapshot` text
- `description_snapshot` text
- `unit_price` numeric
- `quantity` integer
- `total_price` numeric

### `order_item_addons`
- `order_item_id` UUID FK
- `addon_option_id` UUID FK
- `name_snapshot` text
- `price_delta` numeric
- PK: (`order_item_id`, `addon_option_id`)

### `order_status_events`
Tracks state changes for auditing.
- `id` UUID PK
- `order_id` UUID FK
- `status` ENUM (same as orders.status)
- `changed_by_user_id` UUID FK → users.id
- `created_at` timestamp

### `order_assignments`
Optional dispatch history.
- `id` UUID PK
- `order_id` UUID FK
- `rider_id` UUID FK
- `assigned_at`, `accepted_at`, `rejected_at`

## 8) Delivery & tracking

### `rider_profiles`
- `user_id` UUID PK FK → users.id
- `vehicle_type` ENUM(`bike`, `scooter`, `car`)
- `license_number` text
- `is_available` boolean
- `current_lat`, `current_lng` numeric

### `rider_locations`
Time-series location updates.
- `id` UUID PK
- `rider_id` UUID FK → users.id
- `lat` numeric
- `lng` numeric
- `recorded_at` timestamp
- IDX: `(rider_id, recorded_at desc)`

### `delivery_routes`
Optional route optimization data.
- `id` UUID PK
- `order_id` UUID FK
- `polyline` text
- `distance_km` numeric
- `eta_minutes` integer

## 9) Payments, wallets, payouts

### `payment_intents`
Unified payments record.
- `id` UUID PK
- `order_id` UUID FK
- `provider` ENUM(`stripe`, `paypal`, `cash`, `wallet`)
- `provider_ref` text
- `amount` numeric
- `currency` char(3)
- `status` ENUM(`initiated`, `authorized`, `captured`, `failed`, `refunded`)
- `created_at`, `updated_at`

### `wallets`
- `id` UUID PK
- `user_id` UUID FK
- `balance` numeric

### `wallet_transactions`
- `id` UUID PK
- `wallet_id` UUID FK
- `type` ENUM(`credit`, `debit`)
- `amount` numeric
- `reference` text
- `created_at`

### `payouts`
Restaurant and rider payouts.
- `id` UUID PK
- `tenant_id` UUID FK
- `recipient_type` ENUM(`restaurant`, `rider`)
- `recipient_id` UUID FK (restaurant_id or user_id)
- `amount` numeric
- `status` ENUM(`pending`, `paid`, `failed`)
- `paid_at` timestamp

### `commissions`
Stores commission rules.
- `id` UUID PK
- `tenant_id` UUID FK
- `restaurant_id` UUID FK (nullable)
- `rate` numeric
- `effective_from` timestamp

## 10) Promotions & loyalty

### `coupons`
- `id` UUID PK
- `tenant_id` UUID FK
- `code` text UQ
- `type` ENUM(`percent`, `fixed`)
- `value` numeric
- `min_order_amount` numeric
- `max_discount_amount` numeric
- `starts_at`, `ends_at`
- `usage_limit` integer
- `usage_count` integer

### `coupon_redemptions`
- `id` UUID PK
- `coupon_id` UUID FK
- `order_id` UUID FK
- `user_id` UUID FK
- `discount_amount` numeric

### `loyalty_transactions`
- `id` UUID PK
- `user_id` UUID FK
- `points` integer
- `reason` text
- `created_at`

## 11) Reviews & ratings

### `reviews`
- `id` UUID PK
- `order_id` UUID FK
- `restaurant_id` UUID FK
- `user_id` UUID FK
- `rating` smallint (1-5)
- `comment` text
- `created_at`

## 12) Support & dispute resolution

### `tickets`
- `id` UUID PK
- `tenant_id` UUID FK
- `user_id` UUID FK
- `order_id` UUID FK
- `subject` text
- `status` ENUM(`open`, `pending`, `resolved`, `closed`)
- `created_at`, `updated_at`

### `ticket_messages`
- `id` UUID PK
- `ticket_id` UUID FK
- `sender_id` UUID FK
- `message` text
- `created_at`

## 13) Messaging & notifications

### `chat_threads`
- `id` UUID PK
- `order_id` UUID FK
- `created_at`

### `chat_messages`
- `id` UUID PK
- `thread_id` UUID FK
- `sender_id` UUID FK
- `message` text
- `created_at`

### `notification_devices`
- `id` UUID PK
- `user_id` UUID FK
- `platform` ENUM(`web`, `ios`, `android`)
- `token` text
- `created_at`

### `notifications`
- `id` UUID PK
- `user_id` UUID FK
- `title` text
- `body` text
- `data` jsonb
- `read_at` timestamp
- `created_at`

## 14) Auditing & logs

### `audit_logs`
- `id` UUID PK
- `tenant_id` UUID FK
- `user_id` UUID FK
- `action` text
- `entity_type` text
- `entity_id` UUID
- `metadata` jsonb
- `created_at`

## 15) System configuration

### `tenant_settings`
- `tenant_id` UUID PK FK → tenants.id
- `stripe_public_key` text
- `stripe_secret_key` text
- `paypal_client_id` text
- `google_maps_key` text
- `support_email` text
- `default_commission_rate` numeric
- `delivery_base_fee` numeric
- `delivery_per_km_fee` numeric
- `tax_rate` numeric
- `created_at`, `updated_at`

## Suggested indexes
- `orders(tenant_id, restaurant_id, placed_at desc)`
- `orders(tenant_id, customer_id, placed_at desc)`
- `order_items(order_id)`
- `menu_items(restaurant_id, is_active)`
- `rider_locations(rider_id, recorded_at desc)`
- `notifications(user_id, read_at)`
- `coupons(tenant_id, code)`

## Suggested enums
- `user_role`, `user_status`, `restaurant_status`, `order_status`, `payment_status`, `payment_method`, `payout_status`

## Notes
- All FK relationships should use `ON DELETE RESTRICT` for critical entities (orders, payments), and `ON DELETE CASCADE` for child tables (order_items, cart_items).
- Use soft deletes to preserve analytics and audit trails.
- For geo queries, add PostGIS with `geometry` types for zones and use `GiST` indexes.
