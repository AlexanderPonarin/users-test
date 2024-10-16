import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com';

const instance = axios.create({
  baseURL: url,
});

export default instance;
