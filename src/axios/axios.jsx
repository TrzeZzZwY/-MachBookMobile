import axios from "axios";
import config from "appConfig";

export const axiosPrivate = axios.create({
  baseURL: config.apiEndpoint,
});

export const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  baseURL: config.apiEndpoint,
});
