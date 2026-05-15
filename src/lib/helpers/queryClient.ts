import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";
import { toast } from "sonner";
import type { ErrorGeneralResponse } from "@/types/response";
import { FetchError } from "./fetcher";

const STALE_TIME = 1000 * 60 * 5; // 5 minutes

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: STALE_TIME,
    },
    mutations: {
      onError: (error: Error) => {
        let message = error.message;

        if (error instanceof FetchError) {
          message = (error.data as ErrorGeneralResponse).message;
        }

        toast.error(message);
      },
    },
  },
};

export const getQueryClient = cache(() => new QueryClient(queryClientConfig));
