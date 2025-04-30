import React, { useState, useEffect } from "react";
import { useCreateOrder } from "@/hooks/api/order/useCreateOrders";

const CreateOrder = () => {
  const [orderForm, setOrderForm] = useState({
    products: [
      { product: "", quantity: 1 },
    ],
    shippingAddress: {
      address: "",
      city: "",
      postalCode: "",
      country: "",
    },
    paymentMethod: "COD",
    totalPrice: "",
  });

  const { CreateOrderMutation, isPending, isSuccess, error } = useCreateOrder();

  const handleChange = (e, index, key) => {
    const updatedProducts = [...orderForm.products];
    updatedProducts[index][key] = e.target.value;
    setOrderForm({ ...orderForm, products: updatedProducts });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await CreateOrderMutation(orderForm);
  };

  useEffect(() => {
    if (isSuccess) {
      alert("✅ Order placed successfully!");
      setOrderForm({
        products: [{ product: "", quantity: 1 }],
        shippingAddress: {
          address: "",
          city: "",
          postalCode: "",
          country: "",
        },
        paymentMethod: "COD",
        totalPrice: "",
      });
    }
  }, [isSuccess]);

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Create Order</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        {orderForm.products.map((item, idx) => (
          <div key={idx} className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Product ID"
              value={item.product}
              onChange={(e) => handleChange(e, idx, "product")}
              className="flex-1 border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => handleChange(e, idx, "quantity")}
              className="w-24 border p-2 rounded"
              required
            />
          </div>
        ))}

        {/* Shipping Address */}
        {["address", "city", "postalCode", "country"].map((field) => (
          <input
            key={field}
            type="text"
            placeholder={field}
            value={orderForm.shippingAddress[field]}
            onChange={(e) =>
              setOrderForm({
                ...orderForm,
                shippingAddress: {
                  ...orderForm.shippingAddress,
                  [field]: e.target.value,
                },
              })
            }
            className="w-full border p-2 rounded"
            required
          />
        ))}

        <input
          type="text"
          placeholder="Payment Method (e.g. COD)"
          value={orderForm.paymentMethod}
          onChange={(e) => setOrderForm({ ...orderForm, paymentMethod: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          placeholder="Total Price"
          value={orderForm.totalPrice}
          onChange={(e) => setOrderForm({ ...orderForm, totalPrice: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isPending}
        >
          {isPending ? "Creating Order..." : "Create Order"}
        </button>

        {error && <p className="text-red-500 mt-2">{error.message || "Something went wrong"}</p>}
      </form>
    </div>
  );
};

export default CreateOrder;
