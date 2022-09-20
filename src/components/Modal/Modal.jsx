import { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ toggleModal, dataModal: { src, title } }) => {
  useEffect(() => {
    const handleKeydown = ({ code }) => {
      if (code === 'Escape') toggleModal();
    };

    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [toggleModal]);

  const handleOverlayClick = ({ target, currentTarget }) => {
    if (currentTarget === target) toggleModal();
  };

  return (
    <div className={css.Overlay} onClick={handleOverlayClick}>
      <div className={css.Modal}>
        <img src={src} alt={title} />
      </div>
      ;
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  dataModal: PropTypes.shape({
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
};
