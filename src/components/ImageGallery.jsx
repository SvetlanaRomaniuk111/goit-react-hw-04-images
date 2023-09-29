import ImageGalleryItem from './ImageGalleryItem';

const ImageGallery = props => {
  return (
    <ul className="ImageGallery">
      {props.gallery.map(({ id, webformatURL, tags, largeImageURL }) => {
        return (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            tags={tags}
            largeImageURL={largeImageURL}
          />
        );
      })}
    </ul>
  );
};

export default ImageGallery;
