import appConfig from "appConfig";

export type ImageUrlBuilerType = {
  getUserBookItemImage: (id: number) => string;
};

const ImageUrlBuiler: ImageUrlBuilerType = {
  getUserBookItemImage: (id: number) =>
    `${appConfig.apiEndpoint}/${appConfig.apiPaths.userBookItem}/Image/${id}`,
};

export default ImageUrlBuiler;
