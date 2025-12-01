import axiosInstance from "../service/interceptor.js";

async function getAllBlogs({page = 0, size = 3} = {}) {
    const response = await axiosInstance.get('/api/blogs/list', {
        params: {page, size}
    });
    return response.data;
}

async function getBlog(req) {
    const response = await axiosInstance.get(`/api/blogs/findById/${req}`);
    return response.data;
}

async function getBlogsNew() {
    const response = await axiosInstance.get(`/api/blogs/new-arrived`);
    return response.data;
}

export default {getAllBlogs, getBlog, getBlogsNew};