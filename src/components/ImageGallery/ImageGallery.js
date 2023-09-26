import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import React, { useState, useEffect } from 'react';
import { Audio } from 'react-loader-spinner';

export const ImageGallery = ({ inputSearch, setClickedImage }) => {
  const [images, setImages] = useState([]);
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [apiKey] = useState('36974281-9a9267ae338de1504a0765e3e');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          `https://pixabay.com/api/?q=${inputSearch}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${limit}`
        );
        const data = await response.json();

        setImages(data.hits);
        setIsLoading(false);
      } catch (error) {
        console.log('errr', error);
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [inputSearch, page, apiKey, limit]);

  const modalHandler = image => {
    setClickedImage(image);
  };

  const loadMoreHandler = () => {
    setLimit(limit + 12);
    setPage(page + 1);
  };

  return (
    <div>
      <ul className="ImageGallery">
        {images.map(image => (
          <ImageGalleryItem
            src={image.webformatURL}
            alt={image.tags}
            key={image.id}
            onClick={modalHandler}
          />
        ))}
      </ul>
      <Button onClick={loadMoreHandler} />
      {isLoading && (
        <Audio
          className="Spinner"
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
        />
      )}
    </div>
  );
};
