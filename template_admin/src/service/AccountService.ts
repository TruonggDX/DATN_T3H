import axios from 'axios';
import {API_KEY} from "../config/UrlConfig.ts";
import axiosInstance from "../interceptors/axiosInstance.ts";

const api = `${API_KEY}/api/account`
export const getAllAccount = async (page: number, size: number, code?: string, email?: string, roleCode?: string) => {
    try {
        const response = await axios.get(`${api}/list`, {
            params: {page, size, code, email, roleCode},
        })
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getAccount = async () => {
    try {
        const response = await axiosInstance.get(`${api}/get-account`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const createAccount = async (accountData: any, file?: File) => {
    try {
        const formData = new FormData();
        Object.keys(accountData).forEach(key => {
            if (accountData[key] !== undefined && accountData[key] !== null) {
                formData.append(key, accountData[key]);
            }
        });
        if (file) {
            formData.append("file", file);
        }
        const response = await axiosInstance.post(`${api}/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Update account failed:", error);
        throw error;
    }
};
export const updateAccount = async (id: number, accountData: any, file?: File) => {
    try {
        const formData = new FormData();
        Object.keys(accountData).forEach(key => {
            if (accountData[key] !== undefined && accountData[key] !== null) {
                formData.append(key, accountData[key]);
            }
        });
        if (file) {
            formData.append("file", file);
        }
        const response = await axiosInstance.put(`${api}/update/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Update account failed:", error);
        throw error;
    }
};
export const deleteAccount = async (id: number) => {
    try {
        const response = await axiosInstance.delete(`${api}/delete/${id}`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getAccountById = async (id: number) => {
    try {
        const response = await axiosInstance.get(`${api}/findById/${id}`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getTotalAccount = async () => {
    try {
        const response = await axiosInstance.get(`${api}/total-account`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const changePassword = async (id: number, data: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}) => {
    try {
        const response = await axiosInstance.put(`${api}/change-password/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};