import { createContext } from "react";

const AuthContext = createContext<Auth>({
    token: null,
    refreshToken: null,
    userId: 0,
    signInByToken: (token: string, refreshToken: string) => {},
    signIn: (email: string, password: string) => {},
    signOut: () => {},
    register: (email: string, username: string, password: string) => {}
});

export type Auth = Token & {
    userId: number,
    signInByToken: (token: string, refreshToken: string) => void,
    signIn: (email: string, password: string) => void,
    signOut: () => void,
    register: (email: string, username: string, password: string) => void
}

export type Token = {
    token: string | null,
    refreshToken: string | null,
}

export default AuthContext;