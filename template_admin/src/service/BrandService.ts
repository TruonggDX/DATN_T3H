import axios from 'axios';
import {API_KEY} from "../config/UrlConfig.ts";

const api = `${API_KEY}/api/brands`
export const getAllBrand = async (page: number, size: number, code?: string, name?: string) => {
    try {
        const response = await axios.get(`${api}/list`, {
            params: {page, size, code, name},
        })
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteBrand = async (id:number) => {
    try {
        const response = await axios.delete(`${api}/delete/${id}`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const createBrand = async (name: string, description: string, file?: File) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (file) formData.append("file", file);

    try {
        const response = await axios.post(`${api}/create`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("Create brand failed:", error);
        throw error;
    }
};

export const updateBrand = async (id: number, name: string, description: string, file?: File) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (file) formData.append("file", file);

    try {
        const response = await axios.put(`${api}/update/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return response.data;
    } catch (error) {
        console.error("Update brand failed:", error);
        throw error;
    }
};
export const revenueByBrand = async () => {
    try {
        const response = await axios.get(`${api}/revenue-brand`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}