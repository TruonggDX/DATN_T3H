import axiosInstance from "@/service/interceptor";

const apiOrder = '/api/order'
const apiOrderDetails = '/api/oder-details'

async function getOrderDetailsByOrderId(orderId) {
    const response = await axiosInstance.get(`${apiOrderDetails}/get-by-oder/${orderId}`);
    return response.data;
}

async function createBill(req) {
    const response = await axiosInstance.post(`${apiOrder}/create`, req);
    return response.data;
}

async function createBillDetails(req) {
    const response = await axiosInstance.post(`${apiOrderDetails}/create`, req);
    return response.data;
}

async function getAllOrders() {
    const response = await axiosInstance.get(`/api/order/get-order-account`);
    return response.data;
}

async function getOrderById(id) {
    const response = await axiosInstance.get(`${apiOrder}/findById/${id}`);
    return response.data;
}

async function updateCustomerOrders(id, req) {
    const response = await axiosInstance.put(`${apiOrder}/update-customer/${id}`, req);
    return response.data;
}

async function getTotalSoldByProductId(productId) {
    const response = await axiosInstance.get(`${apiOrderDetails}/get-total/${productId}`);
    return response.data;
}

async function cancelOrders(id) {
    const response = await axiosInstance.post(`${apiOrder}/cancel-order/${id}`);
    return response.data;
}

async function checkBuy(id) {
    const response = await axiosInstance.get(`${apiOrder}/check-account/${id}`);
    return response.data;
}
export default {
    getTotalSoldByProductId,
    getOrderDetailsByOrderId,
    createBillDetails,
    createBill,
    getAllOrders,
    getOrderById,
    updateCustomerOrders,
    cancelOrders,
    checkBuy
};