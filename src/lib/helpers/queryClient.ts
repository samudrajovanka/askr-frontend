import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";
import { toast } from "sonner";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: STALE_TIME,
    },
    mutations: {
      onError: (error: Error) => {
        toast.error(error.message);
      },
    },
  },
};

export const getQueryClient = cache(() => new QueryClient(queryClientConfig));
