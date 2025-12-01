import {API_KEY} from "../config/UrlConfig.ts";
import axiosInstance from "../interceptors/axiosInstance.ts";

const api = `${API_KEY}/api/payment-method`
export const revenueByPayment = async () => {
    try {
        const response = await axiosInstance(`${api}/revenue-payment`)
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}