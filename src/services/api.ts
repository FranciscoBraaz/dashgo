import axios from 'axios';
let url = '';

if (process.env.NODE_ENV === 'development') {
  url = 'https://localhost:3000/api';
} else {
  url = 'https://dashgo-chi-seven.vercel.app/api';
}

export const api = axios.create({
  baseURL: url,
});
