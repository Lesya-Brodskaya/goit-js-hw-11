import './css/styles.css';
import Notiflix from 'notiflix';

import fetchImg  from './fetchImg';
import { renderImg } from './renderImg';
import { lightbox } from './SimpleLightBox';

const refs = {
  searchForm: document.querySelector('.search-form'),
  input: document.querySelector('input'),
  onBtn: document.querySelector('button'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.loadMoreBtn.classList.add('is-hidden');
refs.onBtn.addEventListener('click', onSubmit);
refs.loadMoreBtn.addEventListener('click', loadMore);

let page = 1;

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
