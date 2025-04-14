export const useAuth = () =>
  useState(() => ({
    isAuthenticated: false as boolean,
  }));
