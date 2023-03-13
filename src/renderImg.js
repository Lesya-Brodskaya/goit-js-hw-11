export default async function renderImg(img) {
  const markup = img
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<a class="gallery link" href="${largeImageURL}"><div class="photo-card">
  <img class="image" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
</div></a>`;
      }
    )
    .join('');
  refs.galery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
