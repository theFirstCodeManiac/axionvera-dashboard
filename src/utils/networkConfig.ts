import { getEnv } from "./env";

export type StellarNetwork = "mainnet" | "testnet" | "futurenet";

export const NETWORK: StellarNetwork = (getEnv("NEXT_PUBLIC_STELLAR_NETWORK") as StellarNetwork) ?? "testnet";

export const SOROBAN_RPC_URL =
  getEnv("NEXT_PUBLIC_SOROBAN_RPC_URL") ??
  (NETWORK === "mainnet"
    ? "https://soroban-rpc.mainnet.stellar.org"
    : NETWORK === "futurenet"
      ? "https://rpc-futurenet.stellar.org"
      : "https://soroban-testnet.stellar.org");

export const HORIZON_URL =
  getEnv("NEXT_PUBLIC_HORIZON_URL") ??
  (NETWORK === "mainnet" ? "https://horizon.stellar.org" : "https://horizon-testnet.stellar.org");

export const AXIONVERA_VAULT_CONTRACT_ID =
  getEnv("NEXT_PUBLIC_AXIONVERA_VAULT_CONTRACT_ID") ?? "REPLACE_WITH_VAULT_CONTRACT_ID";

export const AXIONVERA_TOKEN_CONTRACT_ID =
  getEnv("NEXT_PUBLIC_AXIONVERA_TOKEN_CONTRACT_ID") ?? "REPLACE_WITH_TOKEN_CONTRACT_ID";
