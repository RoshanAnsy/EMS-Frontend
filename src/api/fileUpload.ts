import axios from "axios";


// Function to upload files and insert into Markdown
export const GetImageServerUrl = async (file: File) => {
    try {
      // Step 1: Get signed URL from backend
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/generateSignUrl`);

      // Step 2: Upload file to Cloudinary using the signed URL
      const formData = new FormData();
      formData.append("file", file);
      formData.append("api_key", data.apiKey);
      formData.append("timestamp", data.timestamp.toString());
      formData.append("signature", data.signature);
      formData.append("public_id", data.publicId);

      const cloudinaryUploadUrl = `https://api.cloudinary.com/v1_1/${data.cloudName}/image/upload`;

      const uploadResponse = await axios.post(cloudinaryUploadUrl, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imageUrl = uploadResponse.data.secure_url;
        
      return imageUrl;
      // Insert uploaded image URL into Markdown
    //   setContent((prev) => (prev ? `${prev}\n\n![Uploaded Image](${imageUrl})` : `![Uploaded Image](${imageUrl})`));
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload");
    } 
  };