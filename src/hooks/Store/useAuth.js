import { create } from "zustand";

const useAuthStore = create((set)=>({
    user:null,
    token:null,
    isLoading:true,

    setAuth:({user,token})=>set({user,token,isLoading:false}),

    logout:()=>{
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        set({user:null,token:null,isLoading:false})
    },

    loadUserFromLocalStorage:()=>{
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if(user&&token){
            set({user:JSON.parse(user),token,isLoading:false});
        }
        else{
          set({user:null,token:null,isLoading:false});
        }
    }
}));

export default useAuthStore;