"use client";

import React, { useState } from "react";

type Props = {
  imgs: string[];
};
const PropertyGallery: React.FC<Props> = ({ imgs }) => {
  /*  const initialImages = [
    "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NzY4NDg1ODAzNjI0MzM3MzIz/original/be08e679-dbc7-4af2-81c7-effc68d120b3.jpeg?im_w=1200&im_format=avif",
    "https://a0.muscache.com/im/pictures/miso/Hosting-1244054576084861285/original/d702a0dc-dd99-4d30-9578-a5851b7fa91d.jpeg?im_w=1200&im_format=avif",
    "https://a0.muscache.com/im/pictures/4cc440bd-c5f2-4508-a37e-aec2a24ffd2d.jpg?im_w=1200&im_format=avif",
    "https://a0.muscache.com/im/pictures/4cc440bd-c5f2-4508-a37e-aec2a24ffd2d.jpg?im_w=1200&im_format=avif",
    "https://a0.muscache.com/im/pictures/4cc440bd-c5f2-4508-a37e-aec2a24ffd2d.jpg?im_w=1200&im_format=avif",
  ]; */

  const [images, setImages] = useState(imgs);

  const handleImageClick = (clickedIndex: number) => {
    // Only swap if it's not already the main image (index 0)

    if (clickedIndex < 1) return;

    const newImages = [...images];
    // Swap the clicked image with the main image
    [newImages[0], newImages[clickedIndex]] = [
      newImages[clickedIndex],
      newImages[0],
    ];
    setImages(newImages);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="col-span-1">
          <img
            src={images[0]}
            alt="Main property view"
            className="w-full h-64 md:h-[500px] object-cover rounded-lg"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.slice(1).map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Property view ${index + 2}`}
              className="w-full h-64 md:h-[242px] object-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity duration-200"
              onClick={() => handleImageClick(index + 1)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyGallery;
