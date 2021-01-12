import Axios from 'axios';
import { store } from 'services/store/store';

const axiosInstance = Axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  transformRequest: (data, headers) => {
    const jwt = store?.getState().Auth.jwt || 'needjwt';

    headers.Authorization = `Bearer ${jwt}`;

    return JSON.stringify(data);
  },
});

export const GET = axiosInstance.get;
export const POST = axiosInstance.post;
export const PUT = axiosInstance.put;
export const PATCH = axiosInstance.patch;
export const DELETE = axiosInstance.delete;
