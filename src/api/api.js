export const fetchImages = async (page, query = '') => {
  const data = await fetch(
    `https://pixabay.com/api/?key=38662933-763155843aa83bb37fcf566da&image_type=photo&orientation=horizontal&per_page=12&page=${page}&q=${query}`
  );
  return data.json();
};
