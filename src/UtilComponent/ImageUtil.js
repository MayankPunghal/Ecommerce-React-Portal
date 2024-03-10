import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageUtil = ({ imageCategory, imageName, altName }) => {
  const [ImageUrl, setImageUrl] = useState('');
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  useEffect(() => {
    // Fetch the image URL when the component mounts
    fetchImageUrl();
  }, [imageName]); // Trigger fetchImageUrl when imageName changes

  const fetchImageUrl = async () => {
    try {
        const response = await axiosInstance.get(`/Images/${imageName}`);
        setImageUrl(response.request.responseURL);
    } catch (error) {
        console.error('Error fetching image:', error);
    }
  };

  return (
    <div>
    <img className = "object-cover w-auto h-auto max-h-48" src={ImageUrl} alt={`${altName}`} />
    </div>
  );
};

export default ImageUtil;
