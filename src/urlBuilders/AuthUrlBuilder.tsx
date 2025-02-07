import appConfig from "appConfig";

export type AuthUrlBuilderType = {
    login: () => string,
    register: () => string,
    refresh: () => string
}

const AuthUrlBuilder: AuthUrlBuilderType = {
    login: () => `${appConfig.apiAuthPaths.user}/Login`,
    register: () => `${appConfig.apiAuthPaths.user}/Register`,
    refresh: () => `${appConfig.apiAuthPaths.auth}/Refresh`,
}

export default AuthUrlBuilder;
