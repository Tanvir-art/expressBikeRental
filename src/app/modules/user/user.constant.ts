export const USER_ROLE = {
  user: 'user',
  admin: 'admin',
} as const;

export type UserRole = keyof typeof USER_ROLE;
