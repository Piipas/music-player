import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";
import { MusicProvider } from "./music-provider";
import { IKContext } from "imagekitio-react";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const imageKitConfig = {
  urlEndpoint: "https://ik.imagekit.io/glkluvyhf/",
  publicKey: "public_yleuBZTPApSiOd6QD2LI58hI7VM=",
  loading: "lazy",
};

export interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MusicProvider>
        <IKContext {...imageKitConfig}>{children}</IKContext>
      </MusicProvider>
      <ReactQueryDevtools initialIsOpen={false} position="right" buttonPosition="top-left" />
    </QueryClientProvider>
  );
}
