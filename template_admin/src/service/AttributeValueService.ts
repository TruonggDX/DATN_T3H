import axios from 'axios';
import {API_KEY} from "../config/UrlConfig.ts";
import {AttributeValue} from "../core/AttributeValue.ts";

const api = `${API_KEY}/api/attribute-value`
export const getAllAttributeValue = async (page: number, size: number, value?:string) => {
    try {
        const response = await axios.get(`${api}/list`, {
            params: {page, size,value},
        })
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const deleteAttributeValue = async (id: number) => {
    try {
        const response = await axios.delete(`${api}/delete/${id}`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createAttributeValue = async (attributeValue: AttributeValue) => {
    try {
        const response = await axios.post(`${api}/create`, attributeValue)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateAttributeValue = async (id:number,attributeValue: AttributeValue) => {
    try {
        const response = await axios.put(`${api}/update/${id}`, attributeValue)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getAttributeValue = async (id:number) => {
    try {
        const response = await axios.get(`${api}/findById/${id}`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}