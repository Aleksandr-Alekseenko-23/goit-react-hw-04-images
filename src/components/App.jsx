import { useState, useEffect, useCallback } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import css from './App.module.css';
import Modal from './Modal/Modal';
import { API } from '../API/API.js';

const App = () => {
  const [imageTitle, setImageTitle] = useState('');
  const [image, setImage] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [dataModal, setDataModal] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getIm() {
      if (imageTitle) {
        try {
          setLoading(true);
          const response = await API(imageTitle, page);
          setImage(prevState => [...prevState, ...response.hits]);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    }
    getIm();
  }, [page, imageTitle]);

  const handleSearchbarSubmit = imageTitle => {
    setPage(1);
    setImageTitle(imageTitle);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const toggleModal = useCallback(data => {
    setShowModal(showModal => !showModal);
    setDataModal(data);
  }, []);

  return (
    <>
      <ToastContainer autoClose={3000} />
      <div className={css.App}>
        <Searchbar onSubmit={handleSearchbarSubmit} />
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        <ImageGallery image={image} toggleModal={toggleModal} />
        {loading && <Loader />}
        {image.length ? <Button onSubmit={loadMore} /> : ''}
        {showModal && <Modal dataModal={dataModal} toggleModal={toggleModal} />}
      </div>
    </>
  );
};

export default App;
