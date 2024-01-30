export const UserRoles = { admin: "Admin", user: "User" };
export const isAdmin = role => role == Object.keys(UserRoles).find(key => UserRoles[key] == UserRoles.admin);