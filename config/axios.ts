import axios from 'axios';

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER,
});

export default request;
