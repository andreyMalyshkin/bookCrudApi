export const Roles = {
    User: 1 << 0,
    Admin: 1 << 1,
    SuperAdmin: 1 << 2
  };
  
  export const hasRole = (userRole: number, role: number) => {
    return (userRole & role) === role;
  };