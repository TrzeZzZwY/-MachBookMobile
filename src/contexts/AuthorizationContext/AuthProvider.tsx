import { useEffect, useState } from "react";
import AuthContext, { Token } from "./AuthContext";
import { TokenResponseType } from "types/TokenResponseType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosPrivate } from "../../axios/axios";

const AuthProvider = ({ children }: { children: JSX.Element }) => {

  const [auth,setAuth] = useState<TokenResponseType>({token: null, refreshToken: null});

  useEffect(() => {
    saveAuthData()
  },[auth])

  const saveAuthData = () => {
    AsyncStorage.setItem("authorization",JSON.stringify(auth))
  }

  const getAuthData = () => {
    AsyncStorage.getItem("authorization").then(data => setAuth(JSON.parse(data)))
  }

  if(auth.token === null) {
    getAuthData()
  }

  const signIn = (email: string, password: string) => {
    axiosPrivate
        .post<TokenResponseType>("auth/login",{
          email: email,
          password: password
        })
        .then(response => response.data)
        .then(data => setAuth({token: data.token, refreshToken: data.refreshToken}))
  }

  const register = (email: string, username: string, password: string) => {
    axiosPrivate
        .post<TokenResponseType>("auth/register",{
          email: email,
          password: password,
          username: username,
        })
        .then(response => response.data)
        .then(data => setAuth({token: data.token,isTokenValid: true}))
  }

  const singOut = () => {
    setAuth(prevState => {
        return {...prevState,isTokenValid: false}
    })
  }

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        signIn: signIn,
        signOut: singOut,
        register: register
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
