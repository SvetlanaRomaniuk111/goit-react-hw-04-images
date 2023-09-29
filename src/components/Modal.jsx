import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

const Modal = props => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyEsc);
    return () => {
      window.removeEventListener('keydown', handleKeyEsc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyEsc = e => {
    if (e.code === 'Escape') {
      props.closeModal();
    }
  };

  const handleOnClick = e => {
    if (e.target === e.currentTarget) {
      props.closeModal();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleOnClick}>
      <div className="Modal">
        <img src={props.imageURL} alt="sadasd" />
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
