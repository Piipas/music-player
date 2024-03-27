import { createContext, useContext, useEffect, useState } from "react";
import { ProvidersProps } from ".";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/lib/api/auth-api";
import { User } from "mp-prisma";

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, isAuthenticated: false });

const AuthProvider = ({ children }: ProvidersProps): React.ReactNode => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  const { data, isSuccess } = useQuery({ queryKey: ["me"], queryFn: async () => await authApi.me() });

  useEffect(() => {
    if (isSuccess) setUser(data), setIsAuthenticated(true);
  }, [isSuccess]);

  return <AuthContext.Provider value={{ user, isAuthenticated }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
