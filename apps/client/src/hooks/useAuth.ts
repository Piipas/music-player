import { authApi } from "@/lib/api/auth-api";
import { useQuery } from "@tanstack/react-query";

const useAuth = () => {
  const { isSuccess, isError, isLoading } = useQuery({ queryKey: ["isAuthenticated"], queryFn: authApi.refresh });
  return { isSuccess, isError, isLoading };
};

export default useAuth;
