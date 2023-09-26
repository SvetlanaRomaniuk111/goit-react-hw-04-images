import { Component } from 'react';
import Modal from './Modal';

export default class ImageGalleryItem extends Component {
  state = {
    isOpen: false,
  };
  togleModal = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };
  render() {
    return (
      <li className="ImageGalleryItem">
        <img
          className="ImageGalleryItem-image"
          src={this.props.webformatURL}
          alt={this.props.tags}
          onClick={this.togleModal}
        />
        {this.state.isOpen && (
          <Modal
            closeModal={this.togleModal}
            imageURL={this.props.largeImageURL}
          />
        )}
      </li>
    );
  }
}
