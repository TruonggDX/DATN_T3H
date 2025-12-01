import axiosInstance from "@/service/interceptor";

async function getAllReviewByProduct(productId, page = 0, size = 5) {
    const response = await axiosInstance.get(`/api/review/findReviewByProductId/${productId}`, {
        params: {
            page: page,
            size: size
        }
    });
    return response.data;
}

async function deleteReview(req){
    const response = await axiosInstance.delete(`/api/review/delete/${req}`);
    return response.data;
}

async function getReview(req){
    const response = await axiosInstance.get(`/api/review/findById/${req}`);
    return response.data;
}

async function updateReview(id,req){
    const response = await axiosInstance.put(`/api/review/update/${id}`,req);
    return response.data;
}

async function createReview(req){
    const response = await axiosInstance.post(`/api/review/create`,req);
    return response.data;
}
export default { getAllReviewByProduct, deleteReview,getReview,updateReview,createReview };