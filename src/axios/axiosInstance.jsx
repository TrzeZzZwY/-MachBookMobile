import axios from "axios";
import config from "appConfig";

const axiosInstance = axios.create({
    baseURL: config.apiEndpoint,
    timeout: 2000
})

export default axiosInstance;