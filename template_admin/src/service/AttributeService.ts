import axios from 'axios';
import {API_KEY} from "../config/UrlConfig.ts";
import {Attribute} from "../core/Attribute.ts";

const api = `${API_KEY}/api/attribute`
export const getAllAttribute = async (page: number, size: number, name?: string) => {
    try {
        const response = await axios.get(`${api}/list`, {
            params: {page, size, name},
        })
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const deleteAttribute = async (id: number) => {
    try {
        const response = await axios.delete(`${api}/delete/${id}`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const getAttribute = async (id: number) => {
    try {
        const response = await axios.get(`${api}/findById/${id}`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createAttribute = async (attribute: Attribute) => {
    try {
        const response = await axios.post(`${api}/create`, attribute)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateAttribute = async (id: number, attribute: Attribute) => {
    try {
        const response = await axios.put(`${api}/update/${id}`, attribute)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

