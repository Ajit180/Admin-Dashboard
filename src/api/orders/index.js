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
