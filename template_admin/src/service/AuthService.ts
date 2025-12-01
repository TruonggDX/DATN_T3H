import axios from 'axios';
import {API_KEY} from "../config/UrlConfig.ts";
import axiosInstance from "../interceptors/axiosInstance.ts";

const api = `${API_KEY}/auth`;

export const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${api}/login`,
            {
                email: email,
                password: password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
};

export const decodeToken = async () => {
    try {
        const response = await axiosInstance.get(`${api}/decode-token`);
        return response.data;
    } catch (error) {
        console.error("Decode token error:", error);
        throw error;
    }
};