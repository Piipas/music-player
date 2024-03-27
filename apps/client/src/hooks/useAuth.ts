import { authApi } from "@/lib/api/auth-api";
import { useQuery } from "@tanstack/react-query";

const useAuth = () => {
  const { isSuccess, isError, isLoading, data } = useQuery({ queryKey: ["isAuthenticated"], queryFn: authApi.refresh });
  console.log(isSuccess, isError, isLoading, data);
  return { isSuccess, isError, isLoading };
};

export default useAuth;
