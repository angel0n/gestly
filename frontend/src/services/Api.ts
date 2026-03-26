import axios from "axios";

const Api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

Api.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

Api.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("auth_cache");
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

export default Api;