import axios from "axios";
import config from "../config.json";

axios.defaults.baseURL = config.apiEndpoint;

axios.interceptors.response.use(
    (res) => res,
    function (error) {
        const expectedError =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;
        if (!expectedError) {
            console.log(error);
            console.log("Unexpected Error(server)");
        }
        return Promise.reject(error);
    }
);

const httpService = {
    post: axios.post,
    put: axios.put,
    get: axios.get,
    delete: axios.delete
};

export default httpService;
