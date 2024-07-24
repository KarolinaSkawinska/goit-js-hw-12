import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BASE_URL = 'https://pixabay.com/api/';

const form = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loader = document.getElementById('loader');
const loadMoreButton = document.getElementById('load-more');

let currentQuery = '';
let currentPage = 1;

const fetchImages = async (query, page = 1) => {
  loader.classList.remove('hidden');
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: '45062704-33fd3c82d061d20576d8c3095',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 40,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again!',
    });
    return { hits: [], totalHits: 0 };
  } finally {
    loader.classList.add('hidden');
  }
};

const renderImages = images => {
  if (currentPage === 1) {
    gallery.innerHTML = '';
  }

  if (images.length === 0 && currentPage === 1) {
    iziToast.info({
      title: 'No Results',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    loadMoreButton.classList.add('hidden');
    return;
  }

  const markup = images
    .map(
      image => `
    <li>
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" />
      </a>
      <div class="info">
        <p>Likes: ${image.likes}</p>
        <p>Views: ${image.views}</p>
        <p>Comments: ${image.comments}</p>
        <p>Downloads: ${image.downloads}</p>
      </div>
    </li>
  `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  const lightbox = new SimpleLightbox('.gallery a');
  lightbox.refresh();
};

const handleSearch = async event => {
  event.preventDefault();
  const query = event.target.elements.query.value.trim();
  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
    });
    return;
  }
  currentQuery = query;
  currentPage = 1;
  const data = await fetchImages(query, currentPage);
  renderImages(data.hits);

  if (data.totalHits > 40) {
    loadMoreButton.classList.remove('hidden');
  } else {
    loadMoreButton.classList.add('hidden');
    if (data.totalHits > 0) {
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  }
};

const loadMore = async () => {
  currentPage += 1;
  const data = await fetchImages(currentQuery, currentPage);
  renderImages(data.hits);

  if (data.totalHits <= currentPage * 40) {
    loadMoreButton.classList.add('hidden');
    iziToast.info({
      title: 'End of Results',
      message: "We're sorry, but you've reached the end of search results.",
    });
  }

  const { height: cardHeight } =
    gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
};

form.addEventListener('submit', handleSearch);
loadMoreButton.addEventListener('click', loadMore);
