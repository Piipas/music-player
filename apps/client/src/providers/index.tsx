import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import AuthProvider from "./auth-provider";

const queryClient = new QueryClient();

export interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        {children}
        <ReactQueryDevtools initialIsOpen={false} position="right" />
      </AuthProvider>
    </QueryClientProvider>
  );
}
