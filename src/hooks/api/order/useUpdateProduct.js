// hooks/api/Product/useUpdateProduct.js

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateProductRequest } from "@/api/orders";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: UpdateProductMutation,
    isPending,
    isSuccess,
    isError,
    error,
    data
  } = useMutation({
    mutationFn: ({ id, name,description,price, token }) =>
      UpdateProductRequest({ id, name,description,price, token }),
    onSuccess: (response) => {
      alert("✅ Product updated successfully");
      console.log("Update successful:", response);
      queryClient.invalidateQueries({ queryKey: ["getAllProduct"] });
    },
    onError: (error) => {
      console.error("❌ Update error:", error);
    },
  });

  return {
    data,
    UpdateProductMutation,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
