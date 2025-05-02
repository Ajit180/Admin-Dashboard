import React, { useState, useEffect } from "react";
import { useCreateProduct } from "@/hooks/api/product/useProductCreate";
import { useQueryClient } from "@tanstack/react-query";
import { getPreginedUrl, uploadImageToAWSpresignedUrl } from "@/api/Presigned";
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
import useAuthStore from "@/hooks/Store/useAuth";

const CreateProduct = () => {
  const [productForm, setProductForm] = useState({
    name: "",
    description: "",
    price: "",
    images: [], // array of uploaded image URLs
    categoryId: "",
    stock: "",
    brand: "",
    rating: "",
  });

  const { token } = useAuthStore();
  const [file, setFile] = useState(null);
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);

  const { isPending, isSuccess, error, createProductmutation } = useCreateProduct();

  // 🟡 Upload file on button click
  const handleUploadImage = async () => {
    if (!file) return alert("Please select a file");
    setUploading(true);

    try {
      const presignedUrl = await getPreginedUrl({ token });

      console.log("Presigned URL Response:", presignedUrl);

      await uploadImageToAWSpresignedUrl({ url: presignedUrl.data, file });
      console.log("File upload success");

      const uploadedUrl = presignedUrl.data.split("?")[0];

      console.log(uploadedUrl);
      setProductForm((prev) => ({
        ...prev,
        images: [uploadedUrl],
      }));
      setIsImageUploaded(true);
    } catch (err) {
      alert("Image upload failed");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  // 🟢 Submit product
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isImageUploaded) return alert("Upload image before submitting");
    await createProductmutation(productForm);
  };

  useEffect(() => {
    if (isSuccess) {
      alert("✅ Product created successfully");
      setProductForm({
        name: "",
        description: "",
        price: "",
        images: [],
        categoryId: "",
        stock: "",
        brand: "",
        rating: "",
      });
      setIsImageUploaded(false);
      setFile(null);
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

          {/* 🟦 File Upload */}
          <div>
            <Label htmlFor="image">Image Upload</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setIsImageUploaded(false);
              }}
            />
            <Button
              type="button"
              onClick={handleUploadImage}
              className="mt-2"
              disabled={!file || uploading}
            >
              {uploading ? "Uploading..." : "Upload Image"}
            </Button>

            {isImageUploaded && (
              <p className="text-green-600 text-sm mt-2">✅ Image Uploaded</p>
            )}
          </div>

          {/* 🟢 Submit */}
          <DialogFooter className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isPending || !isImageUploaded}>
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
