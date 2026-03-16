import { useCallback, useEffect, useMemo, useState } from "react";

type WalletState = {
  address: string | null;
  isConnecting: boolean;
  error: string | null;
};

async function loadFreighter() {
  const mod = await import("@stellar/freighter-api");
  return mod;
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    address: null,
    isConnecting: false,
    error: null
  });

  const isConnected = useMemo(() => Boolean(state.address), [state.address]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (typeof window === "undefined") return;
      try {
        const freighter = await loadFreighter();
        const connected = await freighter.isConnected();
        if (!connected) return;
        const allowed = await freighter.isAllowed();
        if (!allowed) return;
        const address = await freighter.getPublicKey();
        if (!cancelled) setState((s) => ({ ...s, address, error: null }));
      } catch {
        if (!cancelled) setState((s) => ({ ...s, address: null }));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const connect = useCallback(async () => {
    setState((s) => ({ ...s, isConnecting: true, error: null }));
    try {
      if (typeof window === "undefined") throw new Error("Wallet is only available in the browser.");
      const freighter = await loadFreighter();
      const connected = await freighter.isConnected();
      if (!connected) throw new Error("Freighter wallet not detected.");
      await freighter.setAllowed();
      const address = await freighter.getPublicKey();
      setState({ address, isConnecting: false, error: null });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Failed to connect wallet.";
      setState((s) => ({ ...s, isConnecting: false, address: null, error: message }));
    }
  }, []);

  const disconnect = useCallback(() => {
    setState((s) => ({ ...s, address: null, error: null }));
  }, []);

  return {
    address: state.address,
    isConnected,
    isConnecting: state.isConnecting,
    error: state.error,
    connect,
    disconnect
  };
}
