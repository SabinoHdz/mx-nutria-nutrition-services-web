/**
 * ApiFactory: axios client with baseURL and error handling.
 * Exposes get, post, put for API calls.
 */
import axios, { type AxiosError } from 'axios';

const baseURL =
  (import.meta.env.VITE_API_BASE_URL as string)?.trim() ||
  'https://mx-nutria-nutrition-api-web-main-production.up.railway.app';

const client = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

client.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const message =
      error.response?.data?.message ??
      (error.response?.status ? `Error ${error.response.status}` : error.message) ??
      'Error de conexión';
    return Promise.reject(new Error(message));
  },
);

export const api = {
  get: <T = unknown>(url: string, config?: Parameters<typeof client.get>[1]) =>
    client.get<T>(url, config).then((res) => res.data),

  post: <T = unknown>(url: string, data?: unknown, config?: Parameters<typeof client.post>[2]) =>
    client.post<T>(url, data, config).then((res) => res.data),

  put: <T = unknown>(url: string, data?: unknown, config?: Parameters<typeof client.put>[2]) =>
    client.put<T>(url, data, config).then((res) => res.data),
};

export default api;
