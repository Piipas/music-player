import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import { MusicProvider } from "./music-provider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

export interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MusicProvider>{children}</MusicProvider>
      <ReactQueryDevtools initialIsOpen={false} position="right" buttonPosition="top-left" />
    </QueryClientProvider>
  );
}
