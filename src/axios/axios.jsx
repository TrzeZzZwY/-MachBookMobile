import axios from "axios";
import config from "appConfig";

export const axiosAuth = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: config.apiAuthEndpoint,
});

export const axiosPrivate = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: config.apiEndpoint,
});

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: config.apiEndpoint,
});
