import axiosInstance from "@/service/interceptor";

const api = '/api/payment';

async function createVNPay(amount, bankCode) {
    try {
        const response = await axiosInstance.get(`${api}/vn-pay`, {
            params: {amount, bankCode}
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function handleVNPayReturn(query) {
    const response = await axiosInstance.get(`${api}/vnpay_return`, {params: query});
    return response.data;
}

//momo
async function createMomo(req) {
    try {
        const response = await axiosInstance.post(`${api}`, req);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function codeMomoReturn(req) {
    const response = await axiosInstance.get(`${api}/order-status/${req}`);
    return response.data;
}

//zalopay
async function createZaloPay(req) {
    try {
        const response = await axiosInstance.post(`${api}/create-zalopay`, req);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

async function statusZaloPay(req) {
    const response = await axiosInstance.get(`${api}/order-status-zalopay/${req}`);
    return response.data;
}

async function getPaymentMethodByOrderId(req) {
    const response = await axiosInstance.get(`/api/payment-method/get-by-orderId/${req}`);
    return response.data;
}
async function createPaymentMethod(req) {
    const response = await axiosInstance.post(`/api/payment-method/create`,req);
    return response.data;
}
export default {
    createVNPay,
    handleVNPayReturn,
    createMomo,
    codeMomoReturn,
    createZaloPay,
    statusZaloPay,
    getPaymentMethodByOrderId,
    createPaymentMethod
};