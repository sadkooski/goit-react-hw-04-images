import React, { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Audio } from 'react-loader-spinner';
import './styles.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [apiKey] = useState('36974281-9a9267ae338de1504a0765e3e');
  const [clickedImage, setClickedImage] = useState(null);
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

  const submitHandler = evt => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const inputValue = form.elements.search.value;
    setInputSearch(inputValue);
    setPage(1);
  };

  const loadMoreHandler = () => {
    setLimit(limit + 12);
    setPage(page + 1);
  };

  const modalHandler = image => {
    setClickedImage(image);
  };

  const closeModal = () => {
    setClickedImage(null);
  };

  return (
    <div
      className="App"
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Searchbar onSubmit={submitHandler} />
      {inputSearch && (
        <ImageGallery gallery={images} onClick={modalHandler}></ImageGallery>
      )}
      <Button onClick={loadMoreHandler} />
      {clickedImage && <Modal image={clickedImage} onClose={closeModal} />}
      {isLoading && (
        <Audio
          className="Spinner"
          height="80"
          width="80"
          radius="9"
          color="green"
          ariaLabel="loading"
          wrapperStyle
          wrapperClass
        />
      )}
    </div>
  );
};

export default App;
