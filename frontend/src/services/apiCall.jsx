import axios from "axios";

const base_url=import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({});

export const apiCall = (method, url, data, headers, params) => {
  return axiosInstance({
    method: method,
    url: base_url+url,
    data: data?data:null,
    headers: headers?headers:null,
    params: params?params:null,
  });
};
