import axios from 'axios';
import {API_KEY} from "../config/UrlConfig.ts";
import {ProductDto} from "../core/ProductDto.ts";

const api = `${API_KEY}/api/product`
export const getAllProduct = async (page: number, size: number, code?: string, name?: string, cateId?: number, brandId?: number) => {
    try {
        const response = await axios.get(`${api}/list`, {
            params: {page, size, code, name, cateId, brandId},
        })
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const getProduct = async (id: number) => {
    try {
        const response = await axios.get(`${api}/findById/${id}`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteProduct = async (id: number) => {
    try {
        const response = await axios.delete(`${api}/delete/${id}`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createProduct = async (productDto: ProductDto, files?: File[]) => {
    try {
        const formData = new FormData();

        formData.append("code", productDto.code);
        formData.append("name", productDto.name);
        formData.append("sortDescription", productDto.sortDescription || "");
        formData.append("description", productDto.description || "");
        formData.append("categoryId", String(productDto.categoryId));
        formData.append("brandId", String(productDto.brandId));

        if (files && files.length > 0) {
            files.forEach(file => formData.append("file", file));
        }

        const response = await axios.post(`${api}/create`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const updateProduct = async (id: number, productDto: ProductDto, files?: File[]) => {
    try {
        const formData = new FormData();

        formData.append("code", productDto.code);
        formData.append("name", productDto.name);
        formData.append("sortDescription", productDto.sortDescription || "");
        formData.append("description", productDto.description || "");
        formData.append("categoryId", String(productDto.categoryId));
        formData.append("brandId", String(productDto.brandId));

        if (files && files.length > 0) {
            files.forEach(file => formData.append("file", file));
        }

        const response = await axios.put(`${api}/update/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};