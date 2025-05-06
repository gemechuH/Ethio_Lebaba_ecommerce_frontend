import React, { useState } from "react";

import axios from "axios";
import { getBaseUrl } from "../../../../utils/baseURL";

const UploadImage = ({ name, setImage }) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");

  // base64 functionality

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  // request to upload a file
  // request to upload a file
   const uploadSingleImage = async (base64) => {
     try {
       setLoading(true);
       const response = await axios.post(
         `${getBaseUrl()}/api/uploadImage`,
         { image: base64 },
         {
           headers: {
             "Content-Type": "application/json",
           },
           withCredentials: true,
           maxContentLength: Infinity,
           maxBodyLength: Infinity,
         }
       );

       if (!response.data) {
         throw new Error("No response from server");
       }

       const imageUrl = response.data;
       setUrl(imageUrl);
       setImage(imageUrl);
       alert("Image uploaded successfully");
     } catch (error) {
       console.error("Upload error details:", {
         message: error.message,
         response: error.response?.data,
         status: error.response?.status,
       });
       alert(
         error.response?.data?.message ||
           "Failed to upload image. Please try again."
       );
     } finally {
       setLoading(false);
     }
   };

   const uploadImage = async (event) => {
     try {
       const file = event.target.files[0];
       if (!file) {
         alert("Please select an image");
         return;
       }

       if (file.size > 10 * 1024 * 1024) {
         // 10MB limit
         alert("File is too large. Please choose an image under 10MB");
         return;
       }

       const base64 = await convertBase64(file);
       await uploadSingleImage(base64);
     } catch (error) {
       console.error("File processing error:", error);
       alert("Failed to process image");
     }
   };

  return (
    <div>
      <label htmlFor={name}>Upload Image</label>
      <input
        type="file"
        name={name}
        id={name}
        onChange={uploadImage}
        className="add-product-InputCSS"
      />
      {loading && (
        <div className="mt-2 text-sm text-blue-600">Product uploading...</div>
      )}
      {url && (
        <div className="mt-2 text-sm text-green-600">
          <p>Image uploaded successfully!</p>
          <img src={url} alt="uploaded-image" />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
