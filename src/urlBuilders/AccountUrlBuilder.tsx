import appConfig from "appConfig";

export type AccountUrlBuilderType = {
  getUserData: (id: number) => string;
  changeRegion: () => string;
};

const AccountUrlBuilder: AccountUrlBuilderType = {
  getUserData: (id: number) => `${appConfig.apiPaths.user}/${id}`,
  changeRegion: () => `${appConfig.apiPaths.user}/region`,
};

export default AccountUrlBuilder;
