import { createContext } from "react";
import { User } from "../types/UserType";
import { To } from "@react-navigation/native/lib/typescript/src/useLinkTo";

const AuthContext = createContext<Auth>({
    token: null,
    isTokenValid: false,
    signIn: (email: string, password: string) => {},
    signOut: () => {},
    register: (email: string, username: string, password: string) => {}
});

export type Auth = Token & {
    signIn: (email: string, password: string) => void,
    signOut: () => void,
    register: (email: string, username: string, password: string) => void
}

export type Token = {
    token: string | null,
    isTokenValid: boolean,
}

export default AuthContext;