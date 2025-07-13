import axios from 'axios';

export const api = axios.create({ baseURL: '/api' });

export function fetcher(url: string) {
  return api.get(url).then((res) => res.data);
}
