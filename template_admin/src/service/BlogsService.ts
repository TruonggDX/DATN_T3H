import axios from 'axios';
import {API_KEY} from "../config/UrlConfig.ts";

const api = `${API_KEY}/api/blogs`
export const getAllBlogs = async (page:number,size:number) =>{
    try {
        const response = await axios.get(`${api}/list`, {
            params: { page, size },
        })
        return response.data;
    }catch (error){
        console.error(error);
        throw error;
    }
}