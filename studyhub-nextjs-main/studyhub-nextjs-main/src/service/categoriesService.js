import axiosInstance from "../service/interceptor.js";

async function getAllCategories() {
    const response = await axiosInstance.get('/api/category/list');
    return response.data;
}

export default {getAllCategories};