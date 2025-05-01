import { useMutation } from "@tanstack/react-query";
import { UpdateCategoryRequest } from "@/api/category";
import { useQueryClient } from "@tanstack/react-query";

export const useUpdateCategory = () => {

  const queryClient = useQueryClient();
  const {
    mutateAsync: UpdateCategoryMutation,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn:({id, name, slug, token})=> UpdateCategoryRequest({id, name, slug, token}), 
    // here i facing an error because in the mutationFn i did not passed all the value i just passing the token and data
    // so that why i facing an error 
    onSuccess: (response) => {
        alert('Updated Successfully');
        console.log("Update successful:", response);
        queryClient.invalidateQueries({queryKey:["getAllCategory"]})
      },
      onError: (error) => {

        console.error("Update error:", error);
      },
  });

  return {
    UpdateCategoryMutation,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
