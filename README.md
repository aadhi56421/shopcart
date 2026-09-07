# Shopping Cart Application

A responsive shopping cart app built with React 19, TypeScript, and Vite. Users can browse products
pulled live from a public API, search and filter them, manage a persistent cart, and complete a
three-step checkout flow.

Built as an intern technical assignment focused on React/TypeScript fundamentals, state management,
and validation rather than feature count.

## Live app

- **Live deployment:** _add your Cloudflare Pages URL here after deploying_
- **Repository:** _add your GitHub repo URL here_

## Technologies used

- **React 19** + **TypeScript** + **Vite** — app shell and build tooling
- **Tailwind CSS v4** — styling
- **React Router** — client-side routing between the product list, cart, and checkout pages
- **TanStack Query** — fetching, caching, and loading/error state for the product API
- **Zustand** (with the `persist` middleware) — global cart state, saved to `localStorage`
- **Zod** — validates the product API response and the shipping form
- **Vitest** — unit tests for the cart total calculations

## API used

[dummyjson.com/products](https://dummyjson.com/products) — a free public product API. The app fetches
up to 100 products, and every response is parsed through a Zod schema before it's used anywhere in the
UI; if the API ever returns something unexpected, the parse fails loudly instead of letting bad data
reach a component.

## Project structure

```
src/
  api/            fetch functions (talks to dummyjson.com)
  schemas/        Zod schemas (product API response, shipping form)
  store/          Zustand cart store (state + actions + persistence)
  hooks/          useProducts (TanStack Query), useProductFilters (search/filter/sort)
  utils/          pure cart math (subtotal/tax/discount/total) + its unit tests
  components/     presentational building blocks (product card, cart row, filters, steps, states)
  pages/          route-level components (product list, cart, checkout)
```

The split follows the assignment's separation of concerns: **TanStack Query** owns server data
(products) and its loading/error/caching states; **Zustand** owns client state (the cart) and is the
only thing persisted to `localStorage`. Product data is never copied into Zustand.

## Setup instructions

Requires Node 18+ and [pnpm](https://pnpm.io).

```bash
pnpm install
pnpm dev        # starts the dev server (prints the local URL)
```

## Commands

| Command       | Description                              |
| ------------- | ----------------------------------------- |
| `pnpm dev`    | Start the Vite dev server                 |
| `pnpm build`  | Type-check and build for production       |
| `pnpm preview`| Preview the production build locally      |
| `pnpm test`   | Run the Vitest unit tests                 |
| `pnpm lint`   | Run oxlint                                |

## Features completed

- Product grid (responsive, 1–4 columns) showing image, title, category, price, rating, and an
  Add to Cart button; loading (skeleton), error (with retry), empty, and success states are all
  handled.
- Search by title, filter by category and price range, sort by price/rating, and a "clear filters"
  action — all driven by a single `useProductFilters` custom hook.
- Cart: add, remove, increase/decrease quantity (clamped between 1 and 5), clear cart. Managed
  entirely through a Zustand store persisted to `localStorage` via the `persist` middleware, so the
  cart survives a page refresh.
- Order summary with subtotal, 5% tax, a 10% discount once the subtotal passes $100, and the final
  total. Checkout is disabled below the $10 minimum, with a message explaining why and how much more
  is needed.
- Three-step checkout (Cart Review → Shipping → Payment Summary) with a visual stepper. The shipping
  form is plain React state (no form libraries) validated with Zod on submit, with errors shown next
  to each field. The final step is read-only and shows everything before the order is placed;
  Place Order shows a success screen and clears the cart.
- Fully responsive across mobile, tablet, and desktop.

## Known limitations

- No product detail page — the grid is the whole browsing experience.
- No payment gateway integration (not required by the assignment) — "Place Order" is a simulated
  success.
- Price filtering is a manual min/max input rather than a slider.
- The product API has no server-side search/filter/pagination, so all ~100 products are fetched once
  and filtered client-side.
- No skeleton/dark mode toggle beyond the loading skeleton already implemented.

## How things work (for reviewers)

- **Product fetching:** `src/api/products.ts` calls `dummyjson.com/products`, and `useProducts`
  (`src/hooks/useProducts.ts`) wraps that call in `useQuery` so TanStack Query owns caching,
  `isLoading`, and `isError`.
- **Validation:** the raw JSON is parsed with `productsResponseSchema` (Zod) before being returned;
  a failed parse is thrown as an `Error`, which TanStack Query surfaces as `isError` — the same path
  the UI's error state already handles. The shipping form uses the same pattern with `shippingSchema`,
  called from `handleSubmit` in `ShippingStep.tsx`, mapping any `ZodError` issues back to per-field
  messages.
- **Cart store:** `src/store/cartStore.ts` is a Zustand store — `items` plus the actions that mutate
  it (`addItem`, `removeItem`, `increaseQuantity`, `decreaseQuantity`, `clearCart`). Wrapping it in
  `persist({ name: "shopping-cart-storage" })` serializes `items` to `localStorage` on every change and
  rehydrates it on load, which is how the cart survives a refresh.
- **Cart totals:** `src/utils/cartCalculations.ts` has one pure function, `calculateCartTotals`, that
  takes the cart items and returns `{ subtotal, tax, discount, total }` — no state, no side effects,
  which is what makes it unit-testable (see `cartCalculations.test.ts`).
- **Why the hook/component split:** `useProductFilters` holds all search/filter/sort state and the
  filtering logic itself, so `ProductListPage` only has to render whatever it's handed — the same
  reason `useProducts` is a hook instead of a `useQuery` call inlined in the page.

### What I'd improve with more time

- A product detail page/route.
- Debounce the search input instead of filtering on every keystroke.
- Move the min/max price filter to a proper range slider.
- Add component-level tests (React Testing Library) for the checkout steps, not just the pure cart
  math.
- Persist the in-progress checkout step/shipping form too, so a refresh mid-checkout isn't lost.
