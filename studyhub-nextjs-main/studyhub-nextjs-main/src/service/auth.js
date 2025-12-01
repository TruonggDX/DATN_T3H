import axiosInstance from "../service/interceptor.js";

async function login(req) {
    const response = await axiosInstance.post('/auth/login', req);
    return response.data;
}

async function decodeToken() {
    const response = await axiosInstance.get('/auth/decode-token');
    return response.data;
}

async function signUp(req) {
    const response = await axiosInstance.post('/auth/signup', req);
    return response.data;
}
async function resendCode(req){
    const response = await axiosInstance.post(`/auth/resend?email=${req}`);
    return response.data;
}
async function verifyOtp(req) {
    const response = await axiosInstance.post('/auth/verify', req);
    return response.data;
}

async function getUser() {
    const response = await axiosInstance.get('/api/account/get-account');
    return response.data;
}

async function changePassword(id, req) {
    const response = await axiosInstance.put(`/api/account/change-password/${id}`, req);
    return response.data;
}

async function updateAccount(id, formData) {
    const response = await axiosInstance.put(`/api/account/update/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export default {login, signUp, verifyOtp, getUser, decodeToken, changePassword, updateAccount,resendCode};