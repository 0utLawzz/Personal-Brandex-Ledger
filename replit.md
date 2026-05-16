# Brandex DMS

Enterprise trademark and document management system for intellectual property law practices in Pakistan.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080, proxied at `/api`)
- `pnpm --filter @workspace/brandex-dms run dev` — run the frontend (proxied at `/`)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite + Wouter routing + TanStack Query
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Charts: Recharts
- Layout: react-resizable-panels (split-pane)

## Where things live

- **DB schema**: `lib/db/src/schema/` — clients, cases, payments, activity
- **API spec**: `lib/api-spec/openapi.yaml` — single source of truth
- **API routes**: `artifacts/api-server/src/routes/` — clients, cases, payments, activity, dashboard
- **Frontend pages**: `artifacts/brandex-dms/src/pages/` — dashboard, clients, client-ledger, cases, payments
- **Generated hooks**: `lib/api-client-react/src/generated/api.ts`
- **Generated Zod schemas**: `lib/api-zod/src/generated/api.ts`

## Architecture decisions

- Drizzle `numeric` columns return and expect strings — route handlers must call `String(value)` on monetary fields (due, received, amount) before Zod validation
- All financial figures are PKR (Pakistani Rupees); `formatPKR` utility in `artifacts/brandex-dms/src/lib/format.ts`
- Dashboard summary is a lightweight aggregate endpoint at `GET /api/dashboard/summary` — computed on every request from live DB data
- Client ledger (`GET /api/clients/:id/ledger`) returns the full case + payment + balance roll-up in one request
- Activity log is append-only; each route handler writes an activity entry on create/update

## Product

- **Clients**: Create and manage client accounts (unique client codes like X-413, contact details, notes)
- **Cases**: Trademark filings with 6-digit TM numbers, 45 trademark classes, stage tracking (1–45), PKR financial columns
- **Client Ledger**: Per-client financial overview with Recharts graph, case table, payment history, and running balance
- **Payments**: Log and track due/received payments linked to clients and cases
- **Dashboard**: Real-time financial totals, cases-by-stage breakdown, recent activity feed

## User preferences

- Currency: PKR only — always displayed as "PKR 25,000" format
- Dense professional UI — enterprise inbox/workspace style (Gmail/Outlook feel)
- Three-pane layout: sidebar | list/table | detail pane
- No flashy gradients, no heavy animations, no SaaS template styling

## Gotchas

- Always run codegen after changing `lib/api-spec/openapi.yaml`
- Drizzle numeric fields → always coerce to String before insert/update: `body.due = String(body.due)`
- `pnpm --filter @workspace/db run push` must be run after schema changes to apply to the dev DB
- Do not run `pnpm dev` at workspace root — start workflows individually

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
