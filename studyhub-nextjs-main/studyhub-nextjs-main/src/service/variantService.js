import axiosInstance from "@/service/interceptor";

async function getVariantByProductId(req){
    const response = await axiosInstance.get(`/api/variant/get-all-by-product/${req}`);
    return response.data;
}

async function getAttributeValue(){
    const response = await axiosInstance.get(`/api/attribute-value/list`);
    return response.data;
}
export default { getVariantByProductId,getAttributeValue };