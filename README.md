# Multikart Product Page

A responsive product-details storefront built with Next.js, React, TypeScript, and Tailwind CSS. The page includes a product gallery, variant and quantity controls, cart interactions, product information tabs, related products, responsive navigation, and storefront overlays.

## Getting started

Requirements:

- Node.js 20.9 or newer
- npm 11

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Project structure

```text
app/                 Next.js route, layout, metadata, and global styles
components/store/    Storefront sections and interactive product features
lib/                 Product data and shared utilities
public/              Product and storefront image assets
```

Static product data lives in `lib/product-data.ts`. Shared cart and wishlist state is provided by `components/store/cart-context.tsx`.
