// src/api/order/index.js
import axios from "@/config/axiosconfig";

export const CreateOrderRequest = async ({ products, shippingAddress, paymentMethod, totalPrice, token }) => {
  try {
    const response = await axios.post(
      "/order/createorder",
      {
        products,
        shippingAddress,
        paymentMethod,
        totalPrice,
      },
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    console.log("✅ Order created:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error in creating order:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};


export const UpdateProductRequest = async ({ id, name,description,price, token }) => {
  try {
    const response = await axios.put(
      `/product/updateproduct/${id}`,
      { name, description,price},
      {
        headers: {
          "x-access-token": token,
        },
      }
    );

    console.log("✏️ Product updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error in updating product:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};


export const DeleteProductRequest = async ({ id, token }) => {
  try {
    const response = await axios.delete(`/product/deleteproduct/${id}`, {
      headers: {
        "x-access-token": token,
      },
    });

    console.log("🗑️ Product deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error in deleting product:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};


export const GetAllProductsRequest = async (token) => {
  try {
    const response = await axios.get("/product/getall", {
      headers: {
        "x-access-token": token,
      },
    });

    console.log("📦 All products fetched:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error in fetching products:", error.response?.data || error.message);
    throw error.response?.data || error;
  }
};