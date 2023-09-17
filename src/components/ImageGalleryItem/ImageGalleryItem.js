import React from 'react';

export const ImageGalleryItem = ({ src, alt, onClick }) => {
  const handleImageClick = () => {
    onClick(src);
  };

  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={src}
        alt={alt}
        onClick={handleImageClick}
      />
    </li>
  );
};
