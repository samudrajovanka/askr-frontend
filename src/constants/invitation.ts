export const INVITATION_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  EXPIRED: "expired",
  CANCELLED: "cancelled",
} as const;

export const invitationStatuses = Object.values(INVITATION_STATUS);

export const invitationStatusLabels = {
  [INVITATION_STATUS.PENDING]: "Pending",
  [INVITATION_STATUS.ACCEPTED]: "Accepted",
  [INVITATION_STATUS.EXPIRED]: "Expired",
  [INVITATION_STATUS.CANCELLED]: "Cancelled",
};
