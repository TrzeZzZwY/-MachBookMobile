import appConfig from "appConfig";

export type ExchangeUrlBuilderType = {
  exchangeBook: () => string;
};

const ExchangeUrlBuilder: ExchangeUrlBuilderType = {
  exchangeBook: () => `${appConfig.apiEndpoint}/${appConfig.apiPaths.exchange}`,
};

export default ExchangeUrlBuilder;
