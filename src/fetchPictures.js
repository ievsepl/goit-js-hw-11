export function fetchPictures(name, pageNumber) {
  return fetch(
    `https://pixabay.com/api/?key=31447881-15e5026ae3260bf72b1d03ba5&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=200`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
      // Notify.failure('Oops, there is no country with that name');
    }
    return response.json();
  });
}
