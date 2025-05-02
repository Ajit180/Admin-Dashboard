// hooks/api/Product/useGetAllProduct.js

import { useQuery } from "@tanstack/react-query";
import { GetAllProductsRequest } from "@/api/orders";

export const useGetAllProduct = (token) => {

  const {
    data,
    isLoading,
    isError,
    error,
    refetch: fetchProduct,
  } = useQuery({
    queryKey: ["getAllProduct"],
    queryFn: () => GetAllProductsRequest(token),
    onError: (err) => {
      console.error("GetAllProduct error:", err);
    },
    enabled: !!token,
  });

  return {
    data,
    isLoading,
    isError,
    error,
    fetchProduct,
  };
};
