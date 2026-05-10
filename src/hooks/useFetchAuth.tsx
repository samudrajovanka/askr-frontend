import { useAuth } from "@clerk/nextjs";
import { useCallback } from "react";

export const useFetchAuth = <TArgs extends unknown[], TResult>(
  callback: (token: string, ...args: TArgs) => Promise<TResult>,
) => {
  const { getToken, isSignedIn, userId } = useAuth();

  const execute = useCallback(
    async (...args: TArgs) => {
      const token = await getToken();

      if (!token) {
        throw new Error("Not authenticated");
      }

      return callback(token, ...args);
    },
    [callback, getToken],
  );

  return {
    execute,
    userId,
    isSignedIn,
  };
};
