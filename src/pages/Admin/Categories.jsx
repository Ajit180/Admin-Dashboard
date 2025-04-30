import React, { useEffect, useState } from "react";
import { useCreateCategory } from "@/hooks/api/Category/useCategory";

const Categories = () => {
  const [categoryForm, SetCategoryForm] = useState({
    name: '',
    slug: ''
  });

  const {isPending,isSuccess,error,CreateCategorymutation}=useCreateCategory();

   async function handlesubmit(e){
    e.preventDefault(); // Correct usage of preventDefault without passing any argument.

    await CreateCategorymutation({
      name:categoryForm.name,
      slug:categoryForm.slug
    })

    // SetCategoryForm({ name: "", slug: "" });

    // // show success alert
    // alert("Category created successfully ✅");
   }

   useEffect(() => {
    if (isSuccess) {
      alert("Category created successfully ✅");
      SetCategoryForm({ name: '', slug: '' });
    }
  }, [isSuccess]);
  

  return (
    <div className="bg-white shadow rounded p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create New Category</h2>
      <form onSubmit={handlesubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={categoryForm.name}
            onChange={(e) => SetCategoryForm({ ...categoryForm, name: e.target.value })}
            placeholder="e.g. Electronics"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Slug
          </label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            value={categoryForm.slug}
            onChange={(e) => SetCategoryForm({ ...categoryForm, slug: e.target.value })}
            placeholder="e.g. brand"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Category
        </button>
      </form>
    </div>
  );
};

export default Categories;
