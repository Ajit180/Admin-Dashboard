import React, { useState } from "react";
import { getPreginedUrl,uploadImageToAWSpresignedUrl } from "@/api/Presigned";// adjust path if needed
import useAuthStore from "@/hooks/Store/useAuth";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const { token } = useAuthStore();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setUploadStatus("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select an image first.");
      return;
    }

    try {
      setUploadStatus("Getting pre-signed URL...");
      const presignedUrl = await getPreginedUrl({ token });
      console.log('presigned-Url',presignedUrl);
      if (!presignedUrl) {
        throw new Error("Failed to get pre-signed URL.");
      }

      setUploadStatus("Uploading to S3...");
      const uploadResponse = await uploadImageToAWSpresignedUrl({
        url: presignedUrl.data, // here i facing lot's of error
        file: selectedFile,
      });

      if (uploadResponse?.status === 200) {
        setUploadStatus("✅ Image uploaded successfully!");
      } else {
        setUploadStatus("❌ Upload failed.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadStatus("❌ Upload error.");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Upload Image to S3</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Upload
      </button>
      {uploadStatus && <p className="mt-4">{uploadStatus}</p>}
    </div>
  );
};

export default ImageUpload;
