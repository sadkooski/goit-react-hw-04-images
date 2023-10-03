import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import React, { useState, useEffect } from 'react';
import { Audio } from 'react-loader-spinner';
import { fetchImages } from 'services/api';

export const ImageGallery = ({ inputSearch, setClickedImage }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   fetchImages(inputSearch, page, apiKey, limit, setImages, setIsLoading);
  // }, [inputSearch, page, apiKey, limit, setIsLoading, setImages]);

  useEffect(() => {
    const getImages = async () => {
      const data = await fetchImages(inputSearch, page);
      if (page > 1) {
        setImages(prevState => [...prevState, ...data.hits]);
      } else {
        setImages(data.hits);
      }
      setIsLoading(false);
    };
    getImages();
  }, [inputSearch, page]);

  const modalHandler = image => {
    setClickedImage(image);
  };

  const loadMoreHandler = () => {
    setPage(page + 1);
  };

  return (
    <div
      style={{
        overflowY: 'AuthenticatorAssertionResponse',
      }}
    >
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
