"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { queryClientConfig } from "@/lib/helpers/queryClient";

interface ProvidersProps extends React.PropsWithChildren {}

const Providers = ({ children }: ProvidersProps) => {
  const [queryClient] = useState(() => new QueryClient(queryClientConfig));

  return (
    <ClerkProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>{children}</TooltipProvider>

        <ReactQueryDevtools />
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default Providers;
