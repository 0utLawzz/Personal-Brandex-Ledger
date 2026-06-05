# Architecture Documentation

## Core Architecture

This project is structured as a pnpm workspace monorepo.

```mermaid
graph TD
    UI[@workspace/brandex-dms] --> API_Client[@workspace/api-client-react]
    API_Client --> Orval[Orval Codegen]
    Orval --> Spec[openapi.yaml]
    Server[@workspace/api-server] --> Spec
    Server --> DB[@workspace/db]
    DB --> PostgreSQL[(PostgreSQL)]
```

## Technical Stack

- **Frontend**: React + Vite + Wouter + TanStack Query.
- **Backend**: Express 5 API server.
- **Database**: PostgreSQL with Drizzle ORM.
- **Validation**: Zod & `drizzle-zod`.
- **API Codegen**: Orval (generates React Query hooks and Zod schemas).

---

## 👨‍💻 Credits

**By OutLawZ™** | https://www.brandex.pk | net2tara@gmail.com
