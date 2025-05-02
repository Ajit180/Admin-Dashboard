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
  const [files, setFiles] = useState([]); // store multiple files
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [uploading, setUploading] = useState(false);

  const {
    data: createdata,
    isPending,
    isSuccess,
    error,
    createProductmutation,
  } = useCreateProduct();

  console.log("createdata", createdata);
  // 🟡 Upload multiple images
  const handleUploadImages = async () => {
    if (!files.length) return alert("Please select images");
    if (files.length > 4) return alert("You can only upload up to 4 images");

    setUploading(true);
    const uploadedUrls = [];

    try {
      for (let file of files) {
        const presignedUrl = await getPreginedUrl({ token });
        await uploadImageToAWSpresignedUrl({ url: presignedUrl.data, file });
        const uploadedUrl = presignedUrl.data.split("?")[0];
        uploadedUrls.push(uploadedUrl);
      }

      console.log("Uploaded Urls", uploadedUrls);

      setProductForm((prev) => ({
        ...prev,
        images: uploadedUrls,
      }));

      console.log("images", productForm.images);

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
      setFiles([]);
    }
  }, [isSuccess]);

  console.log("productform", productForm);

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
            <Label htmlFor="image">Upload up to 4 images</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                const selected = Array.from(e.target.files);
                if (selected.length > 4) {
                  alert("You can upload up to 4 images only");
                  return;
                }
                setFiles(selected);
                setIsImageUploaded(false);
              }}
            />
            <Button
              type="button"
              onClick={handleUploadImages}
              className="mt-2"
              disabled={!files.length || uploading}
            >
              {uploading ? "Uploading..." : "Upload Images"}
            </Button>
            {isImageUploaded && (
              <div className="flex gap-2 mt-2">
                {/* {productForm.images.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Uploaded ${index}`}
                    className="w-20 h-20 object-cover rounded px-1"
                  />
                ))} */}
                <p className="text-green-600 text-sm mt-2">
                ✅ All images uploaded
              </p>
              </div>
            )}

            {/* {isImageUploaded && (
              <p className="text-green-600 text-sm mt-2">
                ✅ All images uploaded
              </p>
            )} */}
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
