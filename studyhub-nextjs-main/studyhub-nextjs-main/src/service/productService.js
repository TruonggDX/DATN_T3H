import axiosInstance from "../service/interceptor.js";

const getAllProducts = async (
    code = "",
    name = "",
    cateId = null,
    brandId = null,
    page = 0,
    size = 9,
    sort = "id,desc"
) => {
    const params = new URLSearchParams();

    if (code) params.append("code", code);
    if (name) params.append("name", name);
    if (cateId) params.append("cateId", cateId);
    if (brandId) params.append("brandId", brandId);
    params.append("page", page);
    params.append("size", size);
    params.append("sort", sort);

    const response = await axiosInstance.get(`/api/product/list?${params.toString()}`);
    return response.data;
};

async function getProduct(req) {
    const response = await axiosInstance.get(`/api/product/findById/${req}`);
    return response.data;
}

async function getProductSeller() {
    const response = await axiosInstance.get(`/api/product/best-seller`);
    return response.data;
}

async function getProductNew() {
    const response = await axiosInstance.get(`/api/product/new-arrived`);
    return response.data;
}

async function getCourseByName(req){
    const params = new URLSearchParams(req)
    const response = await axiosInstance.get(`api/product/get-name`, {params});
    return response.data;
}

export default {getAllProducts, getProduct, getProductNew, getProductSeller,getCourseByName};