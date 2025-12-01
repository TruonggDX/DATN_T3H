import axiosInstance from "../service/interceptor.js";

async function getAllBrands() {
    const response = await axiosInstance.get('/api/brands/list');
    return response.data;
}

export default {getAllBrands};