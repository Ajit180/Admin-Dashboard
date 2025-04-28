import { useMutation } from "@tanstack/react-query";
import { signupRequest } from "@/api/auth";


export const useSignup = ()=>{
    const {ispending,isSuccess,error,mutateAsync:signupMutation}=useMutation({
            mutationFn:signupRequest,
            onSuccess:(data)=>{
                console.log('Successfully signed up',data);

            },
            onError:(error)=>{
               console.log('Falied to signup ',error);
            }
    })

    return{
        ispending,
        isSuccess,
        error,
        signupMutation
    }
}