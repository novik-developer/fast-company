import axios from "axios";
import configFile from "../config.json";

const http = axios.create({
    baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
    function (config) {
        if (configFile.isFirebase) {
            const containSlash = /\/$/gi.test(config.url);

            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

function transformData(data) {
    return data
        ? Object.keys(data).map((key) => ({
              ...data[key]
          }))
        : [];
}
http.interceptors.response.use(
    (res) => {
        if (configFile.isFirebase) {
            res.data = { content: transformData(res.data) };
        }
        return res;
    },
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
    post: http.post,
    put: http.put,
    get: http.get,
    delete: http.delete
};

export default httpService;
