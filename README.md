# SHOP React SPA

This directory contains a React + Vite SPA port of the original Polymer SHOP demo. The goal of the port is to preserve the original routes, visual structure, responsive behavior, cart flow, and checkout UX without using web components.

## Run locally

```bash
cd react-app
npm install
npm start
```

## Build

```bash
cd react-app
npm run build
```

## Notes

- Static product data and images are copied from the original app into `react-app/public/`.
- The cart is persisted in `localStorage` with the same `shop-cart-data` key used by the Polymer version.
- Checkout remains a demo flow and finishes with the same success-state behavior as the original app.
