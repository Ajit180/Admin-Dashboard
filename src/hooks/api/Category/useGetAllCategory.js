// hooks/api/Category/useGetCategory.js

import { useQuery } from "@tanstack/react-query";
import { GetCategoryAllRequest } from "@/api/category";

export const useGetAllCategory = (token) => {

  const {
    data,
    isLoading,
    isError,
    error,
    refetch: fetchCategory, // correctly named
  } = useQuery({
    queryKey: ["getAllCategory"],
    queryFn: () => GetCategoryAllRequest({ token }),
    onError: (err) => {
      console.error("GetCategory error:", err);
    },
    enabled: !!token, // ensure token exists before query runs
  });

  return {
    data,
    isLoading,
    isError,
    error,
    fetchCategory,
  };
};
