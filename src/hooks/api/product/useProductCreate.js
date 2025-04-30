import { useMutation } from "@tanstack/react-query";
import useAuthStore from "@/hooks/Store/useAuth";
import { CreateProductRequest } from "@/api/product";

export const useCreateProduct = () => {
  const { token } = useAuthStore();

  const {
    mutateAsync: createProductmutation,
    isPending,
    isSuccess,
    error,
    data
  } = useMutation({
    mutationFn: (data) =>
      CreateProductRequest({ ...data, token }),// token included here
    onSuccess: (response) => {
      console.log("✅ Product created successfully:", response);
    },
    onError: (error) => {
      console.log("❌ Error creating product:", error);
    },
  });

  return {
    createProductmutation,
    isPending,
    isSuccess,
    error,
    data
  };
};
