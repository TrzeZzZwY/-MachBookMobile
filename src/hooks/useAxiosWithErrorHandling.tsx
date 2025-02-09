import { useEffect } from "react";
import useAxios from "./useAxios";

export default function useAxiosWithErrorHandling() {
  const axios = useAxios();

  useEffect(() => {
    const response = axios.interceptors.response.use();

    return () => {
      axios.interceptors.response.eject(response);
    };
  });
}
