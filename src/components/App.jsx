import { fetchImages } from 'api/api';
import { useState, useEffect } from 'react';
import Button from './Button';
import ImageGallery from './ImageGallery';
import { Loader } from './Loader';
import SearchBar from './Searchbar';

export const App = () => {
  const [gallery, setGallery] = useState([]);
  const [query, setQuery] = useState('');
  const [totalHits, setTotalHits] = useState(null);
  const [page, setPage] = useState(1);
  const [err, setErr] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadMore = () => {
    setPage(page + 1);
    setIsLoading(true);
  };

  const submit = value => {
    setPage(1);
    setIsLoading(true);
    setQuery(value);
    setGallery([]);
    setTotalHits(null);
  };

  useEffect(() => {
    fetchImages(page, query)
      .then(data => {
        setTimeout(() => {
          setGallery(prev => (query ? [...prev, ...data.hits] : []));
          setTotalHits(data.totalHits);
          setIsLoading(false);
        }, 500);
      })
      .catch(err => {
        setErr(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, query]);

  return (
    <div className="App">
      <SearchBar submit={submit} />
      {isLoading ? (
        <Loader />
      ) : err ? (
        <h1>{err}</h1>
      ) : (
        <>
          <ImageGallery gallery={gallery} />
          <Button
            loadMore={handleLoadMore}
            isRender={gallery.length && totalHits > gallery.length}
            page={page}
          />
        </>
      )}
    </div>
  );
};
