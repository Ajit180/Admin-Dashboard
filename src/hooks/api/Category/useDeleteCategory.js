import { useMutation } from "@tanstack/react-query";
import { DeleteCategoryRequest } from "@/api/category";

export const useDeleteCategory = () => {
  const {
    mutateAsync: DeleteCategoryMutation,
    isPending,
    isSuccess,
    isError,
    error,
  } = useMutation({
    mutationFn:({id,token})=> DeleteCategoryRequest({id,token}),
    onSuccess:(response)=>{
        console.log("The Category is delete Succesfully",response)
    },
    onError:(error)=>{
        console.log("The Error in Deleting the Category",error.message);
    }
  });

  return {
    DeleteCategoryMutation,
    isPending,
    isSuccess,
    isError,
    error,
  };
};
