import { useState } from 'react';
import { toast } from 'react-toastify';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => {
  const [imageTitle, setImageTitle] = useState('');

  const handleTitleChange = ({ currentTarget: { value } }) => {
    setImageTitle(value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (imageTitle.trim() === '') {
      toast.error('Введите название картинки!');
      return;
    }
    onSubmit(imageTitle);
    setImageTitle('');
  };

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          type="text"
          placeholder="Search images and photos"
          value={imageTitle}
          name="imageTitle"
          onChange={handleTitleChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
