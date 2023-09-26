import { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root');

export default class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyEsc);
  }

  handleKeyEsc = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleOnClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleOnClick}>
        <div className="Modal">
          <img src={this.props.imageURL} alt="sadasd" />
        </div>
      </div>,
      modalRoot
    );
  }
}
