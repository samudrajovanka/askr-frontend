import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  acceptInvitation,
  declineInvitation,
  getMyInvitations,
} from "@/endpoints/invitation";
import { useFetchAuth } from "@/hooks/useFetchAuth";

export const getMyInvitationsKey = () => ["my-invitations"];

export const useMyInvitations = () => {
  const { execute: fetchInvitations, isSignedIn } =
    useFetchAuth(getMyInvitations);

  return useQuery({
    queryKey: getMyInvitationsKey(),
    enabled: isSignedIn,
    queryFn: fetchInvitations,
  });
};

export const useAcceptInvitation = () => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(acceptInvitation);

  return useMutation({
    mutationFn: (token: string) => execute(token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getMyInvitationsKey(),
      });
      queryClient.invalidateQueries({ queryKey: ["workspaces"] });
    },
  });
};

export const useDeclineInvitation = () => {
  const queryClient = useQueryClient();
  const { execute } = useFetchAuth(declineInvitation);

  return useMutation({
    mutationFn: (token: string) => execute(token),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: getMyInvitationsKey(),
      });
    },
  });
};
