// import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchPictures } from './fetchPictures.js';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  MY_KEY: '31447881-15e5026ae3260bf72b1d03ba5',
  WEB: 'https://pixabay.com/api/',

  // input: document.querySelector('[name="searchQuery"]'),
  form: document.querySelector('.search-form'),
  loadMoreBtn: document.querySelector('[data-loadMore]'),
  gallery: document.querySelector('.gallery'),

  largeImage: new SimpleLightbox('.photo-card a', {
    captionsData: `alt`,
    captionDelay: 250,
  }),
};
let pageNumber = 1;
let queryArray = '';
let imgCards = '';

refs.form.addEventListener('input', onInputFunction);
refs.form.addEventListener('submit', onSubmitQuery);
refs.gallery.addEventListener('click', onOpenPic);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onInputFunction(e) {
  queryArray = e.target.value.trim();
  return;
}

function onSubmitQuery(e) {
  e.preventDefault();
  if (refs.form.searchQuery.value) {
    onGetPic();
    e.currentTarget.reset();
    clearAll();
    refs.loadMoreBtn.classList.add('is-hidden');
  } else {
    Notify.failure('Sorry, You don`t write any name of picture');
  }
}

function onGetPic() {
  fetchPictures(queryArray, pageNumber)
    .then(data => {
      if (data.hits.length < 1) {
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      } else {
        renderCard(data.hits);
        refs.loadMoreBtn.classList.remove('is-hidden');
        console.log(data.totalHits);

        return;
      }
    })
    .catch(error => {
      refs.loadMoreBtn.classList.add('is-hidden');
      Notify.failure(
        "We're sorry, but you've reached the end of search results."
      );
    });
}

function onLoadMore() {
  pageNumber += 1;
  onGetPic();
}

function renderCard(imgArr) {
  imgCards = imgArr
    .map(img => {
      return `<div class="photo-card">
    <a class="gallery__item"   href="${img.largeImageURL}"><img src=${img.webformatURL} alt="${img.q}" loading="lazy" /></a>
    <div class="info">
      <p class="info-item">
        <b>Likes:</br>${img.likes}</b>
      </p>
      <p class="info-item">
        <b>Views:</br>${img.views}</b>
      </p>
      <p class="info-item">
        <b>Comments:</br>${img.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads:</br>${img.downloads}</b>
      </p>
    </div>
  </div>`;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', imgCards);
}

function onOpenPic(event) {
  // console.log(event.target.nodeName);
  console.dir(event.target);
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  refs.largeImage.open(event.target);
}

function clearAll() {
  refs.gallery.innerHTML = '';
}
