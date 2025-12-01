import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("jwtToken");

        if (config.url !== '/auth/login') {
            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }else {
                window.location.href = "http://localhost:5173/";
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.log('Unauthorized, please login again.');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;