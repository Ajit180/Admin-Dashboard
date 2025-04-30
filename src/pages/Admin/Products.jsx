import React, { useEffect, useState } from "react";
import { useCreateProduct } from "@/hooks/api/product/useProductCreate";

const CreateProduct = () => {
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    images: "", // comma-separated
    categoryId: "",
    stock: "",
    brand: "",
    rating: "",
  });

  const { isPending, isSuccess, error, createProductmutation } =useCreateProduct();

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...productForm,
      images: productForm.images.split(",").map((url) => url.trim()), // string to array
    };

    await createProductmutation(payload);
  }

  useEffect(() => {
    if (isSuccess) {
      alert("✅ Product created successfully");
      setProductForm({
        name: "",
        description: "",
        price: "",
        images: "",
        categoryId: "",
        stock: "",
        brand: "",
        rating: "",
      });
    }
  }, [isSuccess]);

  return (
    <div className="bg-white shadow rounded p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Description", name: "description", type: "text" },
          { label: "Price", name: "price", type: "number" },
          { label: "Images (comma separated URLs)", name: "images", type: "text" },
          { label: "Category ID", name: "categoryId", type: "text" },
          { label: "Stock", name: "stock", type: "number" },
          { label: "Brand", name: "brand", type: "text" },
          { label: "Rating", name: "rating", type: "number" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              type={type}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              value={productForm[name]}
              onChange={(e) => setProductForm({ ...productForm, [name]: e.target.value })}
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create Product"}
        </button>

        {error && (
          <p className="text-red-500 text-sm mt-2">
            {error.message || "Something went wrong"}
          </p>
        )}
      </form>
    </div>
  );
};

export default CreateProduct;
