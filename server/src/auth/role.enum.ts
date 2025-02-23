export enum Role {
  User = 'user',
  Admin = 'admin',
}

export enum Permissions {
  VIEW_MOVIES = 'view_movies',
  CREATE_MOVIES = 'create_movies',
  MANAGE_REVIEWS = 'manage_reviews',
}

export const RolePermissions = {
  [Role.User]: [Permissions.VIEW_MOVIES],
  [Role.Admin]: [Permissions.MANAGE_REVIEWS],
};
