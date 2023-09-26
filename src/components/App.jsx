import { fetchImages } from 'api/api';
import { Component } from 'react';
import Button from './Button';
import ImageGallery from './ImageGallery';
import { Loader } from './Loader';
import SearchBar from './Searchbar';

export class App extends Component {
  state = {
    gallery: null,
    filtedGalery: null,
    query: '',
    page: 1,
    err: '',
    isLoading: true,
  };

  handleLoadMore = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  hangleSearch = e => {
    this.setState({ query: e, page: 1 });
  };

  componentDidUpdate(_, prevState) {
    if (prevState.page !== this.state.page) {
      this.setState({ isLoading: true });
      fetchImages(this.state.page, this.state.query).then(data => {
        setTimeout(() => {
          prevState.query !== this.state.query
            ? this.setState({ gallery: data.hits })
            : this.setState(prev => ({
                gallery: [...prev.gallery, ...data.hits],
              }));
          this.setState({ isLoading: false });
        }, 500);
      });
    } else if (prevState.query !== this.state.query) {
      this.setState({ isLoading: true });
      fetchImages(this.state.page, this.state.query).then(({ hits }) => {
        setTimeout(() => {
          this.state.query
            ? this.setState({ gallery: hits })
            : this.setState({ gallery: [] });
          this.setState({ isLoading: false });
        }, 1000);
      });
    }
  }

  componentDidMount() {
    if (!Boolean(this.state.query)) {
      this.setState({ gallery: [], isLoading: false });
    }
    fetchImages(this.state.page)
      .then(({ hits }) => {
        setTimeout(() => {
          this.state.query
            ? this.setState({ gallery: hits, isLoading: false })
            : this.setState({ gallery: [], isLoading: false });
        }, 1000);
      })
      .catch(err => {
        this.setState({ err, isLoading: false });
      });
  }
  render() {
    return (
      <div className="App">
        <SearchBar hangleSearch={this.hangleSearch} />
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <>
            <ImageGallery gallery={this.state.gallery} />
            <Button
              loadMore={this.handleLoadMore}
              isRender={this.state.gallery.length}
              page={this.state.page}
            />
          </>
        )}
      </div>
    );
  }
}
