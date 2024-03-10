import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadUtil = ({ imageCategory, onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (selectedImage) {
        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('categoryName', imageCategory);

        const response = await axiosInstance.post(`/api/1/image/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Pass the uploaded image name to the parent component
        onImageUpload(response.data.fileName);

        console.log('Image uploaded successfully!');
      } else {
        console.error('No image selected for upload.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
};

export default ImageUploadUtil;
