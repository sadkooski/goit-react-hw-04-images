import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';

export const ImageGallery = ({ gallery, onClick }) => {
  return (
    <ul className="ImageGallery">
      {gallery.map(image => (
        <ImageGalleryItem
          src={image.webformatURL}
          alt={image.tags}
          key={image.id}
          onClick={onClick}
        />
      ))}
    </ul>
  );
};
