import axios from 'axios';
import {API_KEY} from "../config/UrlConfig.ts";
import {Role} from "../core/Role.ts";

const api = `${API_KEY}/api/role`
export const getAllRole = async (page:number,size:number) =>{
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

export const deleteRole = async (id:number) =>{
    try {
        const response = await axios.delete(`${api}/delete/${id}`)
        return response.data;
    }catch (error){
        console.error(error);
        throw error;
    }
}

export const updateRole = async (id: number, role: Role) => {
    try {
        const response = await axios.put(`${api}/update/${id}`, role);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createRole = async (role: Role) => {
    try {
        const response = await axios.post(`${api}/create`, role);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

