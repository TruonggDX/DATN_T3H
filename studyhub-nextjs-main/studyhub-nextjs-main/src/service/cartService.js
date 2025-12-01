import axiosInstance from "@/service/interceptor";

const api = '/api/cart'

async function getAllCart() {
    const response = await axiosInstance.get(`${api}/list`);
    return response.data;
}

async function deleteCart(id) {
    const response = await axiosInstance.delete(`${api}/delete/${id}`);
    return response.data;
}

async function updateCart(courseId, req) {
    const response = await axiosInstance.put(`${api}/update/${courseId}`, req);
    return response.data;
}

async function addCart(req) {
    const response = await axiosInstance.post(`${api}/create`,req);
    return response.data;
}

async function deleteAllCart(ids) {
    return axiosInstance.delete(`${api}/deleteCart`, {
        data: ids
    });
}


export default {getAllCart, deleteCart, updateCart,addCart,deleteAllCart};