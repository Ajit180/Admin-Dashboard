import axios from '@/config/axiosconfig';


export const CreateCategoryRequest = async({name,slug,token})=>{

    try {
     
        const response = await axios.post('category/create',{name,slug},{
            headers:{
                'x-access-token':token
            }
        });

        console.log('Response in creating the category request',response);
        
    } catch (error) {
        console.log('Error in creating the Category ',error);
        throw error.response.data;
    }
}