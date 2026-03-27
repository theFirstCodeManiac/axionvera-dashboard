import type { AppProps } from "next/app";
import { Toaster } from 'sonner';

import "@/styles/globals.css";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
      <Toaster 
        position="top-right"
        richColors 
        closeButton 
        duration={4000}
      />
    </ErrorBoundary>
  );
}
