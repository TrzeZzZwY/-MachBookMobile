import { useContext, useEffect } from "react";
import AuthContext from "../auth/AuthContext";
import axios from "axios";
import { axiosInstance } from "../axios/axios";

export default function useAxios() {
  const context = useContext(AuthContext);

  useEffect(() => {
    const request = axiosInstance.interceptors.request.use(
      (request) => {
        if (!request.headers["Authorization"]) {
          request.headers["Authorization"] = `Bearer ${context.token}`;
        }

        return request;
      },
      (error) => Promise.reject(error)
    );

    const response = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          context.signOut();
        } 
        return Promise.resolve(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(request);
      axiosInstance.interceptors.response.eject(response);
    };
  }, [context]);

  return axiosInstance;
}
