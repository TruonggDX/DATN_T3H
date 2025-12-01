import axios from 'axios';
import {API_KEY} from "../config/UrlConfig.ts";
import {UpdateVariant} from "../core/UpdateVariant.ts";
import {Variant} from "../core/Variant.ts";

const api = `${API_KEY}/api/variant`
export const getVariantByProduct = async (productId:number) =>{
    try {
        const response = await axios.get(`${api}/get-by-product/${productId}`)
        return response.data;
    }catch (error){
        console.error(error);
        throw error;
    }
}

export const updateVariant = async (id: number, variant: UpdateVariant) => {
    try {
        const response = await axios.put(`${api}/update/${id}`, variant);
        return response.data;
    }catch (error){
        console.error(error);
        throw error;
    }
}

export const deleteVariant = async (id: number) => {
    try {
        const response = await axios.delete(`${api}/delete/${id}`);
        return response.data;
    }catch (error){
        console.error(error);
        throw error;
    }
}

export const createVariant = async (variant: Variant) => {
    try {
        const response = await axios.post(`${api}/create`, variant);
        return response.data;
    }catch (error){
        console.error(error);
        throw error;
    }
}