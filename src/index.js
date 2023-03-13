import './css/styles.css';
import Notiflix from 'notiflix';

import fetchImg from './fetchImg';
import { lightbox } from './SimpleLightBox';

const refs = {
  input: document.querySelector('input'),
  onBtn: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
  loadBtn: document.querySelector('.load-more'),
};

refs.loadBtn.classList.add('is-hidden');
refs.onBtn.addEventListener('click', onSubmit);
refs.loadBtn.addEventListener('click', loadMore);

let page = 1;

const markup = data => {
  const galleryElements = data.hits
    .map(
      img =>
        `<a class="gallery link" href="${img.largeImageURL}"><div class="photo-card">
  <img class="image" src="${img.webformatURL}" alt="${img.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${img.likes}
    </p>
    <p class="info-item">
      <b>Views</b>${img.views}
    </p>
    <p class="info-item">
      <b>Comments</b>${img.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${img.downloads}
    </p>
  </div>
</div></a>`
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', galleryElements);
  refs.loadBtn.classList.remove('is-hidden');

  lightbox.refresh();
};

async function onSubmit(evt) {
  evt.preventDefault();
  page = 1;
  refs.gallery.innerHTML = '';
  try {
    const data = await fetchImg(refs.input.value, page);
    console.log(data);
    if (!data.hits.length) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else if (refs.input.value === '') {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    markup(data);
  } catch (error) {
    console.log(error);
  }
}

async function loadMore() {
  try {
    page += 1;
    const data = await fetchImg(refs.input.value, page);
    if (!data.hits.length) {
      refs.loadBtn.classList.add('is-hidden');
    }
    markup(data);
  } catch (error) {
    console.log(error);
  }
}
