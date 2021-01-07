import Axios from 'axios';

export const { get, post, patch, delete: remove } = Axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});
