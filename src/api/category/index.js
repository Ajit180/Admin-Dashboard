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


export const DeleteCategoryRequest = async ({ id, token }) => {
    try {
      const response = await axios.delete(`/category/delete/${id}`, {
        headers: {
          'x-access-token': token
        }
      });
      console.log("Category deleted successfully", response.data);
      return response.data;
    } catch (error) {
      console.error("Error deleting category", error.response?.data || error.message);
      throw error.response?.data || { message: "Failed to delete category" };
    }
  };



  // Update Category
  export const UpdateCategoryRequest = async ({ id, name, slug, token }) => {
    try {
      const response = await axios.put(
        `/category/update/${id}`,
        { name, slug },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating category:", error.message);
      throw error.response?.data || error;
    }
  };
  
 //get category
 
 export const GetCategoryRequest = async ({ id, token }) => {
    try {
      const response = await axios.get(`/category/getall`, {
        headers: {
          "x-access-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error in getting the category by ID", error);
      throw error.response?.data || error;
    }
  };

  export const GetCategoryAllRequest = async ({ token }) => {
    try {
      const response = await axios.get(`/category/getall`, {
        headers: {
          "x-access-token": token,
        },
      });
      return response.data;
    } catch (error) {
      console.log("Error in getting categories", error);
      throw error.response?.data || error;
    }
  };