import axios from 'axios';
import {API_KEY} from "../config/UrlConfig.ts";

const api = `${API_KEY}/api/review`

export const getAllReview = async (page:number, size:number, code?:string, nameProduct?:string) => {
    try {
        const response = await axios.get(`${api}/list`, {
            params: { page, size, code, nameProduct }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteReview = async (id:number) =>{
    try {
        const response = await axios.delete(`${api}/delete/${id}`)
        return response.data;
    }catch (error){
        console.error(error);
        throw error;
    }
}