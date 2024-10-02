import axios from 'axios';

// export const baseURL = "http://localhost:3000/";
// export const baseURL: 'http://192.168.15.101:3333'
export const baseURL = 'http://192.168.0.103:3000';

export const api = axios.create({
  baseURL: baseURL,
});
