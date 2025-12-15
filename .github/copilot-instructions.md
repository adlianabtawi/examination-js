## Repository quick-start for AI agents

This is a small static e‑commerce demo (HTML/CSS/JS). The site is single-page-ish and driven by a single global `app` object in `app.js`. There are no build tools, bundlers, or server-side components in this repo.

Key files
- `app.js` — single source of truth. Contains the `products` array and the `app` object with methods: `init()`, `navigateTo(page)`, `renderProducts()`, `viewProduct(id)`, `renderProductDetail()`, `addToCart(id)`, `renderCart()`, `updateQuantity()`, `removeFromCart()`, `updateCartBadge()`, `toggleMenu()`.
- `index.html` — main markup. Pages are represented by `<div id="<name>-page" class="page">` and toggled by `navigateTo`.
- `produktlista.html` — minimal page that loads `app.js` (used for testing/alternate entry).
- `style.css` — central styling (layout, responsive breakpoint at 768px). CSS relies on specific IDs/classes used by `app.js` (e.g., `product-grid`, `cart-content`, `cart-badge-desktop`).

Architecture and important patterns (do not change lightly)
- Global app object pattern: all UI state and handlers live on `app`. Mutations are in-place (e.g., `app.cart` array). Follow this pattern when adding features.
- DOM-first updates: `app` directly queries and sets `innerHTML` for major blocks (product grid, product detail, cart). Keep IDs and element shapes intact when changing markup.
- Inline handlers: markup generated in JS uses `onclick="app.someMethod(...)"`. New dynamic markup should use the same pattern for consistency.
- Data shape: products are plain objects with fields {id, name, price, image, description}. Cart items are product objects extended with `quantity`.

Developer workflows & commands
- No install step. Open `index.html` directly in a browser for quick iteration.
- If a local server is needed (for CORS or image preview), run one of the following from the repo root:
  - Python: `python -m http.server 8000` (browse to http://localhost:8000)
  - Node (if Node installed): `npx http-server . -p 8000`
- Debugging: use browser DevTools console. The app logs nothing by default — add `console.log()` in `app.js` where helpful. UI feedback often uses `alert()` in this app.

Common edits & examples
- Add a new product: edit `products` array at the top of `app.js`. Keep `id` unique and numeric. The `renderProducts()` function maps the array into `.product-card` HTML.
- Add a new page: create `<div id="my-page" class="page">...</div>` in `index.html`, then call `app.navigateTo('my')` (note `-page` suffix is added in DOM). Ensure any new page content uses existing IDs if it should be updated by `app`.
- Change the cart badge elements: there are three badge targets — `cart-badge-desktop`, `cart-badge-mobile`, `cart-count-menu`. Update all three if you change how counts are computed or rendered.

Integration points & constraints
- No persistence: cart is in-memory only. There is no localStorage or server syncing. If adding persistence, search for `app.cart` usages and update `init()` to hydrate state.
- Images are external URLs in `products`; missing images are not specially handled — adding a fallback requires updating `renderProducts()` and `renderCart()` markup.
- Accessibility: currently minimal (buttons without ARIA). Small changes are fine but avoid renaming element IDs or removing the `button` elements used for click targets.

Style & UI conventions
- Inline SVG icons are used throughout (see `index.html` and generated markup in `app.js`). Use similar SVG snippets and the `.icon` class for consistent sizing.
- Responsive behavior is controlled in `style.css` at `@media (max-width: 768px)`.

When writing code suggestions
- Be explicit about which file(s) to edit and include the exact lines or snippets to change (IDs and class names matter).
- Prefer minimal, local changes that preserve the `app` object API surface (don't split `app` into multiple modules without a clear migration plan).

If anything is ambiguous or you need a policy decision (persist cart, add routing, or introduce a build step), ask the maintainer before making wide structural changes.

Next steps for maintainers
- If you want tests or a build pipeline, add a `package.json` and a small test harness. For now, keep changes small and in-place.

---
If any examples above are unclear or you'd like the file to include more contributor-level detail (e.g., coding style rules or commit conventions), tell me which area to expand.
