# Installation Guide

## Requirements

- Node.js 24
- pnpm
- PostgreSQL database

## Setup

```bash
git clone https://github.com/0utLawzz/Personal-Brandex-Ledger.git
cd Personal-Brandex-Ledger
pnpm install
```

## Database

Configure your local or remote PostgreSQL connection in the `.env` file of the `@workspace/db` package.

```bash
pnpm --filter @workspace/db run push
```

## Run

```bash
# Start API server
pnpm --filter @workspace/api-server run dev

# Start frontend
pnpm --filter @workspace/brandex-dms run dev
```

---

## 👨‍💻 Credits

**By OutLawZ™** | https://www.brandex.pk | net2tara@gmail.com
