# Axionvera Dashboard

Axionvera Dashboard is a web application that allows users to interact with Axionvera smart contracts deployed on Stellar using Soroban.

## Features

- Connect Stellar wallet (Freighter-compatible)
- Display connected wallet address
- View vault balance and rewards
- Deposit tokens into the Axionvera vault
- Withdraw tokens from the vault
- Claim rewards
- View transaction history

## Tech Stack

- Next.js (Pages Router)
- React + TypeScript
- Tailwind CSS
- Stellar wallet integration (Freighter API)
- Soroban RPC configuration
- Axionvera SDK integration via a small adapter layer (easy to swap for the real SDK)

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- npm (or pnpm/yarn)

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open http://localhost:3000.

### Build / Start

```bash
npm run build
npm run start
```

### Lint / Typecheck / Test

```bash
npm run lint
npm run typecheck
npm run test
```

## Wallet Connection

This dashboard supports Freighter-style wallet connection via `@stellar/freighter-api`.

1. Install the Freighter browser extension
2. Create or import a Stellar account
3. Open `/dashboard`
4. Click “Connect Wallet”

If you’re integrating additional wallets later, start in [useWallet.ts](file:///Users/boufdaddy/Documents/trae_projects/axionvera-dashboard/src/hooks/useWallet.ts).

## Configuration

Set environment variables in `.env.local`:

- `NEXT_PUBLIC_STELLAR_NETWORK`: `testnet` | `futurenet` | `mainnet`
- `NEXT_PUBLIC_SOROBAN_RPC_URL`: override RPC URL
- `NEXT_PUBLIC_HORIZON_URL`: override Horizon URL
- `NEXT_PUBLIC_AXIONVERA_VAULT_CONTRACT_ID`: vault contract ID
- `NEXT_PUBLIC_AXIONVERA_TOKEN_CONTRACT_ID`: token contract ID

Network defaults live in [networkConfig.ts](file:///Users/boufdaddy/Documents/trae_projects/axionvera-dashboard/src/utils/networkConfig.ts).

## Axionvera SDK Integration

The dashboard talks to the vault through an adapter interface defined in [contractHelpers.ts](file:///Users/boufdaddy/Documents/trae_projects/axionvera-dashboard/src/utils/contractHelpers.ts).

By default, this repo ships with a mock implementation that persists balances and history in `localStorage` so contributors can run the UI immediately. Replace `createAxionveraVaultSdk()` with calls into the real Axionvera SDK to connect to Soroban contracts.

## Contributing

See [CONTRIBUTING.md](file:///Users/boufdaddy/Documents/trae_projects/axionvera-dashboard/CONTRIBUTING.md).

## License

MIT — see [LICENSE](file:///Users/boufdaddy/Documents/trae_projects/axionvera-dashboard/LICENSE).
