import type { AppRole } from "@pidedirecto/utils";

export type SessionUser = {
  id: string;
  email: string;
  role: AppRole;
  tenantId: string;
};

export function hasRole(user: SessionUser | null, roles: AppRole[]) {
  if (!user) return false;
  return roles.includes(user.role);
}

export function canManageOrders(user: SessionUser | null) {
  return hasRole(user, ["admin", "restaurant_owner", "restaurant_staff", "support"]);
}
