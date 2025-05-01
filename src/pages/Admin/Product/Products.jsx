import React, { useState, useEffect } from "react";
import { useCreateProduct } from "@/hooks/api/product/useProductCreate";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreateProduct = () => {
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    images: "",
    categoryId: "",
    stock: "",
    brand: "",
    rating: "",
  });

  const { isPending, isSuccess, error, createProductmutation } =
    useCreateProduct();

  async function handleSubmit(e) {
    e.preventDefault();

    const payload = {
      ...productForm,
      images: productForm.images.split(",").map((url) => url.trim()),
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
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          + Add Product
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
        </DialogHeader>

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
              <Label htmlFor={name}>{label}</Label>
              <Input
                id={name}
                type={type}
                value={productForm[name]}
                onChange={(e) =>
                  setProductForm({ ...productForm, [name]: e.target.value })
                }
                required
              />
            </div>
          ))}

          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Product"}
            </Button>
          </DialogFooter>

          {error && (
            <p className="text-red-500 text-sm mt-2">
              {error.message || "Something went wrong"}
            </p>
          )}
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProduct;
