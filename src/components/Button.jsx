import { Component } from 'react';

export default class Button extends Component {
  render() {
    return this.props.isRender ? (
      <button className="Button" onClick={this.props.loadMore}>
        Load more
      </button>
    ) : null;
  }
}
