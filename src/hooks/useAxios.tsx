import { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthorizationContext/AuthContext";
import { AxiosRequestConfig } from "axios";
import { axiosAuth, axiosPrivate } from "../axios/axios";
import { TokenResponseType } from "types/TokenResponseType";
import AuthUrlBuilder from "services/AuthUrlBuilder";

type AxiosRepetableRequest = {
  sent: boolean;
};

export default function useAxios() {
  const internalAxiosInstance = axiosPrivate;
  const context = useContext(AuthContext);

  const refreshToken = () => {
    const refreshPath = AuthUrlBuilder.refresh();

    console.log("Refreshing current token...");

    return axiosAuth
      .post<TokenResponseType>(
        refreshPath,
        { refreshToken: context.refreshToken },
        {
          headers: {
            Authorization: `Bearer ${context.token}`,
          },
        }
      )
      .then((data) => data.data);
  };

  useEffect(() => {
    const request = internalAxiosInstance.interceptors.request.use(
      (request) => {
        if (!request.headers["Authorization"]) {
          request.headers["Authorization"] = `Bearer ${context.token}`;
        }

        return request;
      },
      (error) => Promise.reject(error)
    );

    const response = internalAxiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const request = error?.config as
          | (AxiosRepetableRequest & AxiosRequestConfig)
          | undefined;

        if (
          request?.headers &&
          error?.response?.status === 403 &&
          request?.sent !== true
        ) {
          const tokenResponse = await refreshToken();
          if (!tokenResponse) return Promise.reject();

          context.signInByToken(
            tokenResponse.token,
            tokenResponse.refreshToken
          );
          request.headers["Authorization"] = `Bearer ${tokenResponse.token}`;
          request.sent = true;

          return axiosPrivate(request);
        }

        if (error?.response?.status === 403 || error?.response?.status === 401)
          context.signOut();

        return Promise.resolve(error);
      }
    );

    return () => {
      internalAxiosInstance.interceptors.request.eject(request);
      internalAxiosInstance.interceptors.response.eject(response);
    };
  }, [context.token, refreshToken]);

  return internalAxiosInstance;
}
