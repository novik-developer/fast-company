import axios from "axios";
import configFile from "../config.json";
import { httpAuth } from "../hooks/useAuth";
import localStorageService from "./localStorage.service";

const http = axios.create({
    baseURL: configFile.apiEndpoint
});

http.interceptors.request.use(
    async function (config) {
        if (configFile.isFirebase) {
            const containSlash = /\/$/gi.test(config.url);

            config.url =
                (containSlash ? config.url.slice(0, -1) : config.url) + ".json";
            const expiresDate = localStorageService.getExpiresDate();
            const refreshToken = localStorageService.getRefreshToken();
            if (refreshToken && expiresDate < Date.now()) {
                const { data } = await httpAuth.post("token", {
                    grant_type: "refresh_token",
                    refresh_token: refreshToken
                });
                console.log("data", data);
                localStorageService.setToken({
                    refreshToken: data.refresh_token,
                    idToken: data.id_token,
                    expiresIn: data.expires_in,
                    localId: data.user_id
                });
            }
            const accessToken = localStorageService.getAccessToken();
            if (accessToken) {
                config.params = { ...config.params, auth: accessToken };
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

function transformData(data) {
    return data && !data._id
        ? Object.keys(data).map((key) => ({
              ...data[key]
          }))
        : data;
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
    delete: http.delete,
    patch: http.patch
};

export default httpService;
