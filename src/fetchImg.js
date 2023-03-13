import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '34292986-668a020bed047eca08aa180e6';

export default async function fetchImg(query, page) {
  try {
    let { data } = await axios.get(
      `${BASE_URL}?key=${KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`
    );
    return data;
  } catch (error) {
    console.log(error);
  }
}
