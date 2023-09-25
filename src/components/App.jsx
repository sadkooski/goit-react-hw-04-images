import React, { useState, useEffect } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import './styles.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [limit, setLimit] = useState(12);
  // const [page, setPage] = useState(1);
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

  const closeModal = () => {
    setClickedImage(null);
  };

  // const loadMoreHandler = () => {
  //   setLimit(limit + 12);
  //   setPage(page + 1);
  // };

  // const modalHandler = image => {
  //   setClickedImage(image);
  // };

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
      {inputSearch && <ImageGallery isLoading={isLoading} />}
      {clickedImage && <Modal image={clickedImage} onClose={closeModal} />}
    </div>
  );
};

export default App;
