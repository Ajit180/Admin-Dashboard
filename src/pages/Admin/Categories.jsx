import React, { useEffect, useState } from "react";
import { useGetAllCategory } from "@/hooks/api/Category/useGetAllCategory";
import { useCreateCategory } from "@/hooks/api/Category/useCategory";
import { useUpdateCategory } from "@/hooks/api/Category/useUpdateCategory";
import { useDeleteCategory } from "@/hooks/api/Category/useDeleteCategory";
import useAuthStore from "@/hooks/Store/useAuth";

const Categories = () => {
  const [categoryForm, setCategoryForm] = useState({ name: '', slug: '' });
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const {token}=useAuthStore();

  const { data: categories = [], isLoading: isFetching } = useGetAllCategory(token);
  const { CreateCategorymutation, isSuccess: isCreated } = useCreateCategory();
  const { DeleteCategoryMutation, isSuccess: isDeleted } = useDeleteCategory();
  const { UpdateCategoryMutation, isSuccess: isUpdated } = useUpdateCategory();

  console.log(categories.category);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      await UpdateCategoryMutation({
        token:token,
        id: selectedCategoryId,
        name: categoryForm.name,
        slug: categoryForm.slug,
      });
    } else {
      await CreateCategorymutation({
        token:token,
        name: categoryForm.name,
        slug: categoryForm.slug,
      });
    }
  };

  useEffect(() => {
    if (isCreated || isUpdated) {
      alert(`Category ${isCreated ? "created" : "updated"} successfully ✅`);
      setCategoryForm({ name: '', slug: '' });
      setIsEditMode(false);
    }
  }, [isCreated, isUpdated]);

  useEffect(() => {
    if (isDeleted) {
      alert("Category deleted successfully ❌");
      //here write the logic to reload the page
    }
  }, [isDeleted]);

  const handleEdit = (category) => {
    setCategoryForm({ name: category.name, slug: category.slug });
    setSelectedCategoryId(category._id);
    setIsEditMode(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      await DeleteCategoryMutation({id,token});
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Manage Categories</h2>

      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-4 mb-6">
        <h3 className="text-lg font-medium mb-2">{isEditMode ? "Update Category" : "Create Category"}</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Category Name"
            value={categoryForm.name}
            onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
          />
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Slug"
            value={categoryForm.slug}
            onChange={(e) => setCategoryForm({ ...categoryForm, slug: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {isEditMode ? "Update" : "Create"}
        </button>
      </form>

      <div className="bg-white shadow rounded p-4">
        <h3 className="text-lg font-medium mb-4">Category List</h3>
        {isFetching ? (
          <p>Loading categories...</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {(categories?.category || []).map((cat) => (
              <li key={cat._id} className="flex justify-between items-center py-2">
                <div>
                  <p className="font-medium">{cat.name}</p>
                  <p className="text-sm text-gray-500">Slug: {cat.slug}</p>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={() => handleEdit(cat)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >Edit</button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                  >Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Categories;
