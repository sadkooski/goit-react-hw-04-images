import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/Button';
import React from 'react';

export const ImageGallery = isLoading => {
  const [images, setImages] = useState([]);
  const [clickedImage, setClickedImage] = useState(null);
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);

  const modalHandler = image => {
    setClickedImage(image);
  };

  const loadMoreHandler = () => {
    setLimit(limit + 12);
    setPage(page + 1);
  };

  fetchImages();

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
