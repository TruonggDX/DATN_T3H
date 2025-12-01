import axios from 'axios';
import {API_KEY} from "../config/UrlConfig.ts";
import {Categories} from "../core/Categories.ts";
import axiosInstance from "../interceptors/axiosInstance.ts";

const api = `${API_KEY}/api/category`
export const getAllCategories = async (page: number, size: number, code?: string, name?: string) => {
    try {
        const response = await axiosInstance.get(`${api}/list`, {
            params: {page, size, code, name},
        })
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteCategory = async (id: number) => {
    try {
        const response = await axios.delete(`${api}/delete/${id}`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const getCategory = async (id: number) => {
    try {
        const response = await axios.get(`${api}/search/${id}`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createCategory = async (cate: Categories) => {
    try {
        const response = await axios.post(`${api}/create`, cate)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateCategory = async (id: number, category: Categories) => {
    try {
        const response = await axios.put(`${api}/update/${id}`, category)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const revenueByCategory = async () => {
    try {
        const response = await axios.get(`${api}/revenue-category`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}