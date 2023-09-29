import { useState } from 'react';
import Modal from './Modal';

const ImageGalleryItem = props => {
  const [isOpen, setIsOpen] = useState(false);
  const togleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="ImageGalleryItem">
      <img
        className="ImageGalleryItem-image"
        src={props.webformatURL}
        alt={props.tags}
        onClick={togleModal}
      />
      {isOpen && (
        <Modal closeModal={togleModal} imageURL={props.largeImageURL} />
      )}
    </li>
  );
};

export default ImageGalleryItem;
