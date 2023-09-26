import React, { useState } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Modal } from 'components/Modal/Modal';
import './styles.css';

const App = () => {
  const [inputSearch, setInputSearch] = useState('');
  const [clickedImage, setClickedImage] = useState(null);

  const submitHandler = evt => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const inputValue = form.elements.search.value;
    setInputSearch(inputValue);
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 40,
        color: '#010101',
      }}
    >
      <Searchbar onSubmit={submitHandler} />
      {inputSearch && (
        <ImageGallery
          inputSearch={inputSearch}
          setClickedImage={setClickedImage}
        ></ImageGallery>
      )}
      {clickedImage && <Modal image={clickedImage} onClose={closeModal} />}
    </div>
  );
};

export default App;
