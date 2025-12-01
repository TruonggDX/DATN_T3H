import axios from 'axios';
import {API_KEY} from "../config/UrlConfig.ts";

const api = `${API_KEY}/api/order`
const api2= `${API_KEY}/api/oder-details`
export const getAllOrder = async (page: number, size: number, code?: string, status?: string) => {
    try {
        const response = await axios.get(`${api}/list`, {
            params: {page, size, code, status},
        })
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const deleteOrder = async (id: number) => {
    try {
        const response = await axios.delete(`${api}/delete/${id}`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateOrder = async (id: number, status: string) => {
    try {
        const response = await axios.put(`${api}/update-status/${id}`, { status });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getOrder = async (id: number) => {
    try {
        const response = await axios.get(`${api}/findById/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getTotalOrder = async () => {
    try {
        const response = await axios.get(`${api}/get-total-order`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getOrderDetail = async (id: number) => {
    try {
        const response = await axios.get(`${api2}/get-by-oder/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getOrderRecent = async () => {
    try {
        const response = await axios.get(`${api}/get-order-recent`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}