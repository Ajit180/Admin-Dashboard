// src/hooks/api/Order/useCreateOrder.js
import { useMutation } from "@tanstack/react-query";
import { CreateOrderRequest } from "@/api/orders";
import useAuthStore from "@/hooks/Store/useAuth"; // assumes you have useAuth() for token

export const useCreateOrder = () => {
  const { token } = useAuthStore(); // get token from auth context or state

  const {
    mutateAsync: CreateOrderMutation,
    isPending,
    isSuccess,
    error,
  } = useMutation({
    mutationFn: (data) => CreateOrderRequest({ ...data, token }),
    onSuccess: (response) => {
      console.log("✅ Order Created Successfully:", response);
      // You can add toast here or redirect, etc.
    },

    // ❌ Handle error here
    onError: (error) => {
      console.error("❌ Failed to create order:", error);
      // You can show toast or error message here
    },
  });

  return { CreateOrderMutation, isPending, isSuccess, error };
};
