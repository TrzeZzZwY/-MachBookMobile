import { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthorizationContext/AuthContext";
import { AxiosRequestConfig } from "axios";
import { axiosAuth, axiosPrivate } from "../axios/axios";
import { TokenResponseType } from "types/TokenResponseType";
import AuthUrlBuilder from "services/AuthUrlBuilder";

type AxiosRepetableRequest = {
  sent: boolean
}

export default function useAxios() {
  const context = useContext(AuthContext);

  const refreshToken = () => {
    const refreshPath = AuthUrlBuilder.refresh();
    return axiosAuth
      .post<TokenResponseType>(refreshPath, {refreshToken: context.refreshToken},{
          headers: {
            "Authorization" : `Bearer ${context.token}`
          }
        })
      .then(data => data.data)
  } 

  useEffect(() => {
    const request = axiosPrivate.interceptors.request.use(
      (request) => {
        if (!request.headers["Authorization"]) {
          request.headers["Authorization"] = `Bearer ${context.token}`;
        }

        console.log(request)

        return Promise.resolve(request);
      },
      (error) => Promise.reject(error)
    );

    const response = axiosPrivate.interceptors.response.use(
      (response) => {
        console.log(response);
        return response;
      },
      async (error) => {
        const request = error?.config as (AxiosRepetableRequest & AxiosRequestConfig) | undefined;

        if (request?.headers && error?.response?.status === 403 && request?.sent !== true) {
          const tokenResponse = await refreshToken();
          if(!tokenResponse)
            return Promise.reject();
          
          context.signInByToken(tokenResponse.token,tokenResponse.refreshToken);
          request.headers["Authorization"] = `Bearer ${tokenResponse.token}`;
          request.sent = true;

          return axiosPrivate(request);
        } 

        if((error?.response?.status === 403 || error?.response?.status === 401))
        {
          console.log(error)
          context.signOut();
          return Promise.resolve(error)
        }

        return Promise.resolve(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(request);
      axiosPrivate.interceptors.response.eject(response);
    };
  }, [context,refreshToken]);

  return axiosPrivate;
}
