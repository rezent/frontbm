import type { User as SharedUser, UserProfile as SharedUserProfile } from '@shared/types';

// Re-export shared types
export type User = SharedUser;
export type UserProfile = SharedUserProfile;

// Дополнительные типы для пользователя
export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface UserPermissions {
  canCreateOrders: boolean;
  canViewOrders: boolean;
  canManageProducts: boolean;
  canManageUsers: boolean;
} 