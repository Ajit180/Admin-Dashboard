// hooks/api/Product/useDeleteProduct.js

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteProductRequest } from "@/api/orders";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: DeleteProductMutation,
    isPending,
    isSuccess,
    isError,
    error,
    data,
  } = useMutation({
    mutationFn: ({ id, token }) =>
      DeleteProductRequest({ id, token }),
    onSuccess: (response) => {
      console.log("🗑️ Product deleted successfully:", response);
      queryClient.invalidateQueries({ queryKey: ["getAllProduct"] });
    },
    onError: (error) => {
      console.error("❌ Error deleting product:", error.message);
    },
  });

  return {
    data,
    DeleteProductMutation,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
