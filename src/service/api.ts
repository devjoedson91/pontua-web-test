import axios, { AxiosError } from "axios";
import md5 from "md5";

const timestamp = Number(new Date());
const publicKey = "46414fb6b12031016e9135c92822ea61";
const privateKey = "afb04c92c8d5c6e578901ba9d8e95a17ec003af2";
const hash = md5(timestamp + privateKey + publicKey);

const params = {
  ts: timestamp,
  apikey: publicKey,
  hash,
};

const api = axios.create({
  baseURL: "https://gateway.marvel.com/v1/public/",
  params,
});

// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error: AxiosError) => {
//     if (error.response?.status === 401) {
//       if (typeof window !== undefined) {
//       } else {
//         return Promise.reject();
//       }
//     }
//   },
// );

export default api;
