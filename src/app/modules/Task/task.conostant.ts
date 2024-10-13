export const TaskStatus = {
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
  DUPLICATE: "Duplicate",
  INVALID: "Invalid",
  EXPIRED: "Expired",
} as const;

export const PriorityLevels = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3,
  URGENT: 4,
} as const;
