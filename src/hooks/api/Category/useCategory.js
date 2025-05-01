import { useMutation ,useQueryClient} from "@tanstack/react-query";
import useAuthStore from "@/hooks/Store/useAuth";
import { CreateCategoryRequest } from "@/api/category";


export const useCreateCategory = ()=>{

    const queryClient = useQueryClient();


    const {token}=useAuthStore();

    const {isPending,isSuccess,error,mutateAsync:CreateCategorymutation}=useMutation({
        mutationFn:(data)=>CreateCategoryRequest({...data,token:token}),
        isSuccess:(response)=>{
            console.log("Successfully created an category",response);
            queryClient.invalidateQueries({ queryKey: ["getAllCategory"] });
        }
        ,
        onError:(error)=>{
            console.log("Error on creating the category",error)
        }
    });

    return{
        isPending,
        isSuccess,
        error,
        CreateCategorymutation
    }
}