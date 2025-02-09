import { useEffect, useState } from "react";
import AuthContext, { Token } from "./AuthContext";
import { TokenResponseType } from "types/TokenResponseType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosAuth } from "../../axios/axios";
import AuthUrlBuilder from "services/AuthUrlBuilder";
import { jwtDecode } from "jwt-decode";

type UserTokenType = {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier": number;
};

const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [auth, setAuth] = useState<Token>({ token: null, refreshToken: null });

  useEffect(() => {
    saveAuthData();
  }, [auth]);

  useEffect(() => {
    getAuthData();
  }, []);

  const saveAuthData = () => {
    AsyncStorage.setItem("app-authorization-data", JSON.stringify(auth));
  };

  const getAuthData = () => {
    AsyncStorage.getItem("app-authorization-data").then((data) => {
      if (data == null) return;

      setAuth(JSON.parse(data));
    });
  };

  const signIn = (email: string, password: string) => {
    const loginPath = AuthUrlBuilder.login();

    console.log(loginPath);

    axiosAuth
      .post<TokenResponseType>(loginPath, {
        email: email,
        password: password,
      })
      .then((response) => response.data)
      .then((data) =>
        setAuth({ token: data.token, refreshToken: data.refreshToken })
      )
      .catch(console.log);
  };

  const signInByToken = (token: string, refreshToken: string) =>
    setAuth({ token: token, refreshToken: refreshToken });

  const register = (email: string, username: string, password: string) => {
    const registerPath = AuthUrlBuilder.register();
    axiosAuth
      .post<TokenResponseType>(registerPath, {
        email: email,
        password: password,
        username: username,
      })
      .then((response) => response.data)
      .then((data) =>
        setAuth({ token: data.token, refreshToken: data.refreshToken })
      );
  };

  const singOut = () => {
    setAuth({ token: null, refreshToken: null });
  };

  const getUserIdFromToken = () => {
    if (!auth.token) return 0;

    const token = jwtDecode<UserTokenType>(auth.token);
    return token[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ];
  };

  return (
    <AuthContext.Provider
      value={{
        userId: getUserIdFromToken(),
        ...auth,
        signInByToken: signInByToken,
        signIn: signIn,
        signOut: singOut,
        register: register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
