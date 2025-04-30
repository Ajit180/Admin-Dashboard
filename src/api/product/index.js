import axios from "@/config/axiosconfig";

// /api/product/index.js
export const CreateProductRequest = async ({
    name,
    description,
    price,
    images,
    categoryId, // used in URL
    stock,
    brand,
    rating,
    token
  }) => {
    try {
      const response = await axios.post(
        `/product/createproduct/${categoryId}`, // <-- using in URL
        { name, description, price, images, stock, brand, rating },// images must be an array
        {
          headers: {
            'x-access-token': token
          }
        }
      );
      console.log('Response in Creating Product:', response);
      return response.data;
    } catch (error) {
      console.log('Error in creating Product:', error);
      throw error.response?.data || error;
    }
  };
  