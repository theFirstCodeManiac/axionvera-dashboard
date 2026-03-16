# Contributing to Axionvera Dashboard

Thanks for contributing! This repo is designed to be modular and easy to extend.

## Development Setup

```bash
npm install
npm run dev
```

## Quality Checks

Run these before opening a PR:

```bash
npm run lint
npm run typecheck
npm run test
```

## Project Conventions

- Components live in `src/components` and are kept presentational when possible
- Contract and SDK integration should go through `src/hooks/useVault.ts`
- Wallet integration should go through `src/hooks/useWallet.ts`
- Network and contract configuration lives in `src/utils/networkConfig.ts`

## Pull Requests

- Keep PRs focused and small when possible
- Include tests for new behavior (UI or hooks)
- Avoid introducing new dependencies unless necessary

## Reporting Security Issues

Please do not open a public issue for security vulnerabilities. Contact the maintainers privately.
