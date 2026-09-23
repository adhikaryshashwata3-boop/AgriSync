# AGRISync Frontend Router + API Integration

This frontend keeps the three application areas separated behind their own router/state/API gateway layers. The backend is a separate project and is not modified by this frontend package.

## Backend base URL

The Vite environment file uses:

`VITE_API_BASE_URL=http://localhost:5000/api`

The API client automatically sends the saved JWT as `Authorization: Bearer <token>` for protected endpoints.

## Farmer gateway

`src/router/farmer/farmerApi.js`

- `POST /auth/signup-farmer`
- `POST /auth/login` (auth helper in `src/api/client.js`)
- `GET /farmer/dashboard`
- `GET /farmer/live-queue`
- `GET /farmer/recommended-slots`
- `POST /farmer/book-slot`
- `GET /farmer/token/:id`
- `GET /farmer/history/:farmerId`
- `GET /farmer/support-info`
- `POST /farmer/ticket`
- `GET /market/msp-prices`
- `GET /market/advisory`

## Mandi Operator gateway

`src/router/mandi-operator/mandiOperatorApi.js`

- `GET /operator/queue`
- `POST /mandi/scan-qr-pass`
- `POST /procurement/generate-receipt`
- shared market/advisory endpoints

## Government gateway

`src/router/government/governmentApi.js`

- `GET /admin/audit-ledger`
- `GET /admin/state-dashboard`
- `GET /market/msp-prices`
- `GET /market/advisory`
- `POST /procurement/generate-receipt`
- `POST /procurement/verify-receipt`

## Role routing

The application does not expose a post-login role switcher. The authenticated user's backend `role` determines which router is mounted:

- `FARMER` -> `FarmerRouter`
- `OPERATOR` -> `MandiOperatorRouter`
- `ADMIN` -> `GovernmentRouter`

## Run

1. Start the existing backend on port `5000`.
2. In this frontend folder run `npm install`.
3. Run `npm run dev`.
4. Open the Vite URL shown in the terminal.

No backend files are included in this package.
