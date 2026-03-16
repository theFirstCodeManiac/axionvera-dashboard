# Frontend Guide

## Component Design

Components in `src/components` are designed to be:

- Presentational: receive data and callbacks via props
- Stateless where possible: keep local state only for form inputs
- Tailwind-first: styling lives in class names, with consistent spacing/typography

Recommended pattern:

- Put async work and side effects in hooks
- Pass callbacks from hooks down to components

## Hooks

### `useWallet`

Location: `src/hooks/useWallet.ts`

Responsibilities:

- Connect/disconnect via Freighter API
- Expose `address`, `isConnected`, `isConnecting`, and `error`

Extension points:

- Add wallet providers (e.g., additional Stellar wallets) behind a provider switch
- Add network switching

### `useVault`

Location: `src/hooks/useVault.ts`

Responsibilities:

- Load balances and transaction history for the connected wallet
- Submit vault actions: deposit, withdraw, claim rewards
- Maintain UI-friendly flags: `isLoading`, `isSubmitting`, `isClaiming`

Extension points:

- Add token selection and allowance flows
- Add pagination for transaction history
- Add on-chain transaction tracking (pending → success/failed)

## Utilities

### `networkConfig`

Location: `src/utils/networkConfig.ts`

- Central source of truth for RPC/Horizon URLs and contract IDs
- Supports environment overrides using `NEXT_PUBLIC_*` variables

### `contractHelpers`

Location: `src/utils/contractHelpers.ts`

- Defines the SDK adapter interface used by `useVault`
- Includes a default mock adapter for local development

## Adding New Features

Common extension paths:

1. Create a new UI component in `src/components`
2. Add a hook (or extend an existing one) in `src/hooks`
3. Update `src/pages/dashboard.tsx` (or add a new page) to wire things together

Keep contract interactions behind the SDK adapter to avoid coupling UI to Soroban calls.
