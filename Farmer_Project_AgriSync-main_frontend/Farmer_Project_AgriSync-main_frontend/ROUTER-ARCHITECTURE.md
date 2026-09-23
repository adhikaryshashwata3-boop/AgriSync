# AGRISync Frontend Router + State Architecture

This package changes **frontend only**. The backend is not included and is not modified.

## Three role gateways

- `src/router/farmer/` — Farmer API gateway, state, route constants and feature route JSX files.
- `src/router/mandi-operator/` — Mandi Operator API gateway, state, route constants and feature route JSX files.
- `src/router/government/` — Government API gateway, state, route constants and feature route JSX files.

Each gateway calls the existing backend endpoints through `src/api/client.js`. No demo data or replacement backend is introduced by this router layer.

## Runtime

Set `VITE_API_BASE_URL` to the base URL of the backend that will be supplied separately. Default: `http://localhost:5000/api/v1`.
