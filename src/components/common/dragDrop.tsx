"use client";

import { useState, useCallback } from "react";
import { GetImageServerUrl } from "@/api/fileUpload";
import { useDropzone } from "react-dropzone";

interface DragDropProps {
  setContent: (updateFn: (prev: string) => string) => void;
}

export default function DragDrop({ setContent }: DragDropProps) {
  const [loading, setLoading] = useState(false);

  // Drag-and-drop file handling & upload
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    setLoading(true);
    try {
      const file = acceptedFiles[0];
      const imageUrl = await GetImageServerUrl(file); // Ensure it's awaited

      if (!imageUrl) throw new Error("Failed to get image URL");

      // Update the Markdown content with the new image
      setContent((prev) => `${prev}\n\n![Uploaded Image](${imageUrl})`);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload");
    } finally {
      setLoading(false);
    }
  }, [setContent]); // ✅ Now, `setContent` is the only dependency

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <div className="flex h-screen bg-background">
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-4">
          {/* Drag & Drop Area */}
          <div
            {...getRootProps()}
            className="border-2 my-2 border-dashed border-gray-300 p-5 text-center cursor-pointer mb-4 rounded-lg"
          >
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select a file</p>
          </div>
          {loading && <p className="text-sm text-blue-500">Uploading...</p>}
        </div>
      </div>
    </div>
  );
}
