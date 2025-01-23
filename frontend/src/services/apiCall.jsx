import axios from "axios";

const baseUrl=import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({});

export const apiCall = (method, url, bodyData, headers, params) => {
  return axiosInstance({
    method: method,
    url:baseUrl+url,
    data: bodyData ? bodyData : null,
    headers: headers ? headers : null,
    params: params ? params : null,
  });
};
