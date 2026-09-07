# Shopping Cart Application

A shopping cart app built with React, TypeScript and Vite. Browse products from a public API,
search/filter them, manage a cart, and go through a simple checkout flow.

## Tech stack

- React 19 + TypeScript + Vite
- Tailwind CSS
- React Router
- TanStack Query (product fetching, caching, loading/error states)
- Zustand + persist middleware (cart state, saved to localStorage)
- Zod (API response validation, shipping form validation)
- Vitest (unit tests for cart totals)

## API used

[dummyjson.com/products](https://dummyjson.com/products) — fetches the product list and validates
the response with Zod before using it anywhere in the app.

## Project structure

```
src/
  api/            fetch functions
  schemas/        zod schemas
  store/          zustand cart store
  hooks/          useProducts, useProductFilters
  utils/          cart total calculations + tests
  components/     product card, cart items, filters, checkout steps, loading/error/empty states
  pages/          product list, cart, checkout
```

TanStack Query handles the product data and its loading/error states. Zustand only holds the cart —
product data isn't duplicated into the store.

## Setup

Requires Node 18+ and pnpm.

```bash
pnpm install
pnpm dev
```

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — type-check and build
- `pnpm preview` — preview production build
- `pnpm test` — run unit tests
- `pnpm lint` — run oxlint

## Features

- Responsive product grid with image, title, category, price, rating, add-to-cart
- Loading, error, empty and success states for the product list
- Search by title, filter by category/price, sort, clear filters
- Add/remove/increase/decrease cart items (qty capped 1–5), clear cart
- Cart persists in localStorage
- Order summary: subtotal, 5% tax, 10% discount over $100, $10 checkout minimum
- 3-step checkout: cart review → shipping (Zod-validated form) → summary → place order

## Known limitations

- No product detail page
- No real payment integration (not required by the assignment)
- Price filter is min/max inputs, not a slider
- No pagination/server-side filtering — all products are fetched once and filtered client-side

## What I'd do with more time

- Product detail page
- Debounce search input
- Range slider for price filter
- Component tests for the checkout steps
- Persist checkout progress, not just the cart
