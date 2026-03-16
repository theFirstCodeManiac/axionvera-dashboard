import { act, renderHook } from "@testing-library/react";

import { useWallet } from "@/hooks/useWallet";

jest.mock("@stellar/freighter-api", () => ({
  isConnected: jest.fn(async () => true),
  isAllowed: jest.fn(async () => true),
  setAllowed: jest.fn(async () => undefined),
  getPublicKey: jest.fn(async () => "GCONNECTEDPUBLICKEY")
}));

describe("useWallet", () => {
  test("connect sets address", async () => {
    const { result } = renderHook(() => useWallet());

    await act(async () => {
      await result.current.connect();
    });

    expect(result.current.address).toBe("GCONNECTEDPUBLICKEY");
    expect(result.current.isConnected).toBe(true);
  });

  test("disconnect clears address", async () => {
    const { result } = renderHook(() => useWallet());

    await act(async () => {
      await result.current.connect();
    });

    act(() => {
      result.current.disconnect();
    });

    expect(result.current.address).toBeNull();
    expect(result.current.isConnected).toBe(false);
  });
});
