import {API_KEY} from "../config/UrlConfig.ts";
import axios from "axios";

const api = `${API_KEY}/api/oder-details`
export const revenueByDay = async () => {
    try {
        const response = await axios.get(`${api}/revenue-day`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const revenueByMonth = async () => {
    try {
        const response = await axios.get(`${api}/revenue-month`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export const revenueByYear = async () => {
    try {
        const response = await axios.get(`${api}/revenue-year`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}