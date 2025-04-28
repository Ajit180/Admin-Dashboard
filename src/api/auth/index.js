import axiosconfig from "../../config/axiosconfig";


export const signupRequest = async({email,password,username})=>{

    try {
        const response = await axiosconfig.post('/user/signup',{
            email,
            password,
            username
        })

        return response.data;
        
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
}

export const siginRequest = async({email,password})=>{
    try {
        const response = await axiosconfig.post('/user/sigin',{
            email,
            password
        })

        return response.data;
        
    } catch (error) {
        console.error(error);
        throw error.response.data;
    }
}
