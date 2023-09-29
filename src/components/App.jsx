import { fetchImages } from 'api/api';
import { useEffect, useState } from 'react';
import Button from './Button';
import ImageGallery from './ImageGallery';
import { Loader } from './Loader';
import SearchBar from './Searchbar';

export const App = () => {
  const [state, setState] = useState({
    gallery: null,
    filtedGalery: null,
    query: '',
    page: 1,
    err: '',
    isLoading: true,
  });

  useEffect(() => {
    setState({ isLoading: true });
    fetchImages(state.page, state.query).then(data => {
      setTimeout(() => {
        setState(prev => ({
          gallery: [...prev.gallery, ...data.hits],
          isLoading: false,
        }));
      }, 500);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.page]);

  const handleLoadMore = () => {
    setState(prev => ({ page: prev.page + 1 }));
  };

  const submit = value => {
    fetchImages(state.page, value)
      .then(data => {
        setState({ gallery: data.hits, query: value });
      })
      .catch(err => {
        setState({ err, isLoading: false });
      });
  };

  useEffect(() => {
    if (!Boolean(state.query)) {
      setState({ gallery: [], isLoading: false });
    }
    fetchImages(state.page)
      .then(({ hits }) => {
        setTimeout(() => {
          state.query
            ? setState({ gallery: hits, isLoading: false })
            : setState({ gallery: [], isLoading: false });
        }, 500);
      })
      .catch(err => {
        setState({ err, isLoading: false });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <SearchBar submit={submit} />
      {state.isLoading ? (
        <Loader />
      ) : (
        <>
          <ImageGallery gallery={state.gallery} />
          <Button
            loadMore={handleLoadMore}
            isRender={state.gallery.length}
            page={state.page}
          />
        </>
      )}
    </div>
  );
};
