import React, { Component } from 'react';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from 'components/ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Modal } from 'components/Modal/Modal';
import { Audio } from 'react-loader-spinner';
import { useEffect, useState } from 'react';

class Gallery extends Component {
  // state = {
  //   images: [],
  //   inputSearch: '',
  //   limit: 12,
  //   page: 1,
  //   apiKey: '36974281-9a9267ae338de1504a0765e3e',
  //   clickedImage: null,
  //   isLoading: false,
  // };

  const [images, setImages] = useState([]);
  const [inputSearch, setinputSearch] = useState('');
  const [limit, setLimit] = useState(12);
  const [page, setPage] = useState(1);
  const [apiKey, setApiKey] = useState('36974281-9a9267ae338de1504a0765e3e');
  const [clickedImage, setClickedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);


  async componentDidMount() {
    this.fetchImages();
  }

  fetchImages = async () => {
    try {
      const { inputSearch, apiKey, limit, page } = this.state;

      this.setState({ isLoading: true });

      const response = await fetch(
        `https://pixabay.com/api/?q=${inputSearch}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${limit}`
      );

      const data = await response.json();

      this.setState({ images: data.hits, isLoading: false });
    } catch (error) {
      console.log('errr', error);
      this.setState({ isLoading: false });
    }
  };

  submitHandler = evt => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const inputValue = form.elements.search.value;

    this.setState({ inputSearch: inputValue, page: 1 }, () => {
      this.fetchImages();
    });
  };

  loadMoreHandler = () => {
    this.setState(
      prevState => ({ limit: prevState.limit + 12, page: prevState.page + 1 }),
      () => {
        this.fetchImages();
      }
    );
  };

  modalHandler = image => {
    this.setState({ clickedImage: image });
  };

  closeModal = () => {
    this.setState({ clickedImage: null });
  };

  render() {
    const { images, clickedImage, isLoading } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.submitHandler} />
        {this.state.inputSearch && (
          <ImageGallery
            gallery={images}
            onClick={this.modalHandler}
          ></ImageGallery>
        )}
        <Button onClick={this.loadMoreHandler} />
        {clickedImage && (
          <Modal image={clickedImage} onClose={this.closeModal} />
        )}
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
  }
}

export default Gallery;
