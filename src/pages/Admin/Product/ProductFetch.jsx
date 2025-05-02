// components/admin/Product.jsx

import React, { useEffect, useState } from "react";
import { useGetAllProduct } from "@/hooks/api/order/useGetAllProduct";
import { useUpdateProduct } from "@/hooks/api/order/useUpdateProduct";
import { useDeleteProduct } from "@/hooks/api/order/useDeleteOrder";
import { useQueryClient } from "@tanstack/react-query";
import useAuthStore from "@/hooks/Store/useAuth";

const ProductDetails = () => {
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    brand: "",
    categoryId: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const { token } = useAuthStore();
  const queryClient = useQueryClient();

  const { data: products = [], isLoading: isFetching } = useGetAllProduct(token);
  const { UpdateProductMutation, isSuccess: isUpdated } = useUpdateProduct();
  const { DeleteProductMutation, isSuccess: isDeleted } = useDeleteProduct();

  console.log(products);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isEditMode) {
      await UpdateProductMutation({
        productId: selectedProductId,
        updatedData: productForm,
        token,
      });
    }
  };

  useEffect(() => {
    if (isUpdated) {
      alert("Product updated successfully ✅");
      setProductForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        brand: "",
        categoryId: "",
      });
      setIsEditMode(false);
      queryClient.invalidateQueries({ queryKey: ["getAllProduct"] });
    }
  }, [isUpdated]);

  useEffect(() => {
    if (isDeleted) {
      alert("Product deleted successfully ❌");
    }
  }, [isDeleted]);

  const handleEdit = (product) => {
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      brand: product.brand,
      categoryId: product.categoryId,
    });
    setSelectedProductId(product._id);
    setIsEditMode(true);
  };

  const handleDelete = async (productId) => {
    if (confirm("Are you sure you want to delete this product?")) {
      await DeleteProductMutation({ productId, token });
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Manage Products</h2>

      <form onSubmit={handleSubmit}  className={`bg-white shadow rounded p-4 mb-6 ${isEditMode ? '' : 'hidden'}`}>
        <h3 className="text-lg font-medium mb-2">{isEditMode ? "Update Product" : "Product Details"}</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Product Name"
            value={productForm.name}
            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
          />
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Description"
            value={productForm.description}
            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
          />
          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Price"
            value={productForm.price}
            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
          />
          <input
            type="number"
            className="border p-2 rounded"
            placeholder="Stock"
            value={productForm.stock}
            onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
          />
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Brand"
            value={productForm.brand}
            onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
          />
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Category ID"
            value={productForm.categoryId}
            onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
          />
        </div>
        {isEditMode && (
          <button
            type="submit"
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>
        )}
      </form>

      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-medium mb-4">Product List</h3>
        {isFetching ? (
          <p>Loading products...</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {(products?.data || []).map((prod) => (
              <li key={prod._id} className="flex justify-between items-center py-2">
                <div>
                  <p className="font-medium">{prod.name}</p>
                  <p className="text-sm text-gray-500">Brand: {prod.brand} | Price: ₹{prod.price}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(prod)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(prod._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
