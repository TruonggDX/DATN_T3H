import axios from 'axios';
import {API_KEY} from "../config/UrlConfig.ts";
import axiosInstance from "../interceptors/axiosInstance.ts";

const api = `${API_KEY}/api/blogs`
export const getAllBlogs = async (page: number, size: number, code?: string, title?: string, nameCate?: string) => {
    try {
        const response = await axios.get(`${api}/list`, {
            params: {page, size, code, title, nameCate},
        })
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getBlogsById = async (id: number) => {
    try {
        const response = await axios.get(`${api}/findById/${id}`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const deleteBlogs = async (id: number) => {
    try {
        const response = await axios.delete(`${api}/delete/${id}`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const updateBlog = async (id: number, formData: FormData) => {
    try {
        const response = await axiosInstance.put(`${api}/update/${id}`, formData);
        return response.data;
    } catch (error) {
        console.error("Update blog error:", error);
        throw error;
    }
};
export const createBlog = async (formData: FormData) => {
    try {
        const response = await axiosInstance.post(`${api}/create`, formData);
        return response.data;
    } catch (error) {
        console.error("Create blog error:", error);
        throw error;
    }
};
