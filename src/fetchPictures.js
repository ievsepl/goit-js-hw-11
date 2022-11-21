import axios from 'axios';

const refs = {
  MY_KEY: '31447881-15e5026ae3260bf72b1d03ba5',
  WEB: 'https://pixabay.com/api/',
};
// export default function fetchPictures(name, pageNumber) {
//   return fetch(
//     `${refs.WEB}?key=${refs.MY_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=200`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

export default async function fetchPictures(name, pageNumber) {
  try {
    const response = await axios.get(
      `${refs.WEB}?key=${refs.MY_KEY}&q=${name}&image_type=photo&orientation=horizontal&safesearch=true&page=${pageNumber}&per_page=40`
    );
    console.log(response);
    // const data = await response.json();
    return response;
    // console.log(data);
  } catch (error) {
    console.error(error);
  }
}
