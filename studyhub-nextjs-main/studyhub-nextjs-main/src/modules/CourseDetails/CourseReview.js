import Image from "next/image";
import ReactPaginate from "react-paginate";
import {useEffect, useState} from "react";
import reviewService from "@/service/reviewService";
import auth from "@/service/auth";
import orderService from "@/service/orderService";

export default function CourseReview({product}) {
    const [reviews, setReviews] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState(null);

    // Thêm: kiểm tra đã mua + đã đánh giá chưa
    const [hasPurchased, setHasPurchased] = useState(false);
    const [hasReviewed, setHasReviewed] = useState(false);

    // Modal tạo đánh giá mới
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newReview, setNewReview] = useState({rating: 0, comment: ""});

    // Modal chỉnh sửa (giữ nguyên như cũ)
    const [modal, setModal] = useState(false);
    const [editData, setEditData] = useState({id: 0, comment: "", rating: 0});

    const paginatePerPage = 5;

    useEffect(() => {
        auth.getUser().then((response) => {
            setCurrentUser(response.data);

            // Kiểm tra đã mua khóa học chưa
            orderService.checkBuy(product.id)
                .then((res) => setHasPurchased(res.data === true))
                .catch(() => setHasPurchased(false));
        }).catch(() => {
            setCurrentUser(null);
        });
    }, [product.id]);

    useEffect(() => {
        if (!product?.id) return;
        renderData();
    }, [product?.id, currentPage]);

    function renderData() {
        if (!product?.id) return;

        setLoading(true);
        reviewService
            .getAllReviewByProduct(product.id, currentPage, paginatePerPage)
            .then((res) => {
                const data = res.data || res;
                setReviews(data.content || []);
                setTotalElements(data.totalElements || 0);

                // Kiểm tra người dùng hiện tại đã đánh giá chưa
                if (currentUser) {
                    const reviewed = data.content?.some(r => r.accountId === currentUser.id);
                    setHasReviewed(reviewed);
                }

                setLoading(false);
            })
            .catch((err) => {
                console.error("Lỗi load review:", err);
                setLoading(false);
            });
    }

    const handlePageChange = ({selected}) => {
        setCurrentPage(selected);
    };

    // === CHỈNH SỬA & XÓA (giữ nguyên như cũ) ===
    const handleEdit = (id) => {
        reviewService.getReview(id).then((res) => {
            setEditData(res.data);
            setModal(true);
        }).catch(() => alert("Không thể tải thông tin đánh giá!"));
    };

    const handleDelete = (id) => {
        if (!window.confirm("Bạn có chắc muốn xóa đánh giá này?")) return;

        reviewService.deleteReview(id)
            .then(() => {
                alert("Xóa thành công!");
                setHasReviewed(false); // Sau khi xóa thì được đánh giá lại
                renderData();
            })
            .catch(() => alert("Xóa thất bại!"));
    };

    const handleSave = async () => {
        if (editData.rating === 0) return alert("Vui lòng chọn số sao!");
        if (!editData.comment.trim()) return alert("Vui lòng nhập bình luận!");

        try {
            await reviewService.updateReview(editData.id, {
                rating: editData.rating,
                comment: editData.comment
            });
            alert("Cập nhật đánh giá thành công!");
            setModal(false);
            setEditData({id: 0, comment: "", rating: 0});
            renderData();
        } catch {
            alert("Cập nhật thất bại!");
        }
    };

    // === TẠO ĐÁNH GIÁ MỚI (mới thêm) ===
    const submitNewReview = async () => {
        if (newReview.rating === 0) return alert("Vui lòng chọn số sao!");
        if (!newReview.comment.trim()) return alert("Vui lòng nhập nội dung đánh giá!");

        try {
            const obj ={
                comment: newReview.comment,
                rating: newReview.rating,
                productId: product.id
            }
            await reviewService.createReview(obj);

            alert("Gửi đánh giá thành công!");
            setShowCreateModal(false);
            setNewReview({rating: 0, comment: ""});
            setHasReviewed(true);
            renderData();
        } catch (err) {
            console.error(err);
            alert("Gửi đánh giá thất bại!");
        }
    };

    // === TÍNH TOÁN SAO (giữ nguyên) ===
    const calculateRatingStats = () => {
        if (reviews.length === 0) {
            return {average: 0, countByStar: {5: 0, 4: 0, 3: 0, 2: 0, 1: 0}};
        }
        let totalRating = 0;
        const countByStar = {5: 0, 4: 0, 3: 0, 2: 0, 1: 0};
        reviews.forEach((r) => {
            const rating = r.rating || 0;
            totalRating += rating;
            countByStar[rating] = (countByStar[rating] || 0) + 1;
        });
        const average = (totalRating / reviews.length).toFixed(1);
        return {average, countByStar};
    };

    const {average, countByStar} = calculateRatingStats();

    const renderStars = (rating) => {
        return [...Array(5)].map((_, i) => (
            <i key={i} className={i < rating ? "fa-solid fa-star" : "fa-regular fa-star"}/>
        ));
    };

    const renderBigStars = () => {
        const fullStars = Math.floor(average);
        const hasHalf = average % 1 >= 0.5;
        return [...Array(5)].map((_, i) => {
            if (i < fullStars) return <i key={i} className="fa-solid fa-star"/>;
            if (i === fullStars && hasHalf) return <i key={i} className="fa-solid fa-star-half-stroke"/>;
            return <i key={i} className="fa-regular fa-star"/>;
        });
    };

    const InteractiveStars = ({rating, onChange}) => {
        return (
            <div style={{display: "flex", gap: "8px", fontSize: "32px", cursor: "pointer", justifyContent: "center"}}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        style={{
                            color: star <= rating ? "#facc15" : "#e5e7eb",
                            transition: "color 0.2s",
                        }}
                        onClick={() => onChange(star)}
                    >
						{star <= rating ? "★" : "☆"}
					</span>
                ))}
            </div>
        );
    };

    // Điều kiện hiển thị nút viết đánh giá
    const canWriteReview = currentUser && hasPurchased && !hasReviewed;

    if (!product) return null;

    return (
        <div className="rating-main-wrapper mt--40">
            {/* PHẦN THỐNG KÊ - GIỮ NGUYÊN 100% */}
            <div className="rating-top-main-wrapper position-relative">
                <div className="rating-area-main-wrapper">
                    <h2 className="title">{average || "0.0"}</h2>
                    <div className="stars-wrapper">{renderBigStars()}</div>
                    <span>Tổng {totalElements} đánh giá</span>
                </div>

                <div className="progress-wrapper-main">
                    {[5, 4, 3, 2, 1].map((star) => {
                        const count = countByStar[star] || 0;
                        const percent = totalElements > 0 ? (count / totalElements) * 100 : 0;

                        return (
                            <div key={star} className="single-progress-area-h">
                                <div className="progress-top icon-gap">
                                    <i className="fa-regular fa-star"></i>
                                    <span className="parcent">{star}</span>
                                </div>
                                <div className="progress">
                                    <div className="progress-bar wow fadeInLeft bg--primary"
                                         style={{width: `${percent}%`}}/>
                                </div>
                                <div className="end">
                                    <span>{count} đánh giá</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* NÚT VIẾT ĐÁNH GIÁ - ICON NHỎ GÓC PHẢI DƯỚI */}
                {canWriteReview && (
                    <div
                        onClick={() => setShowCreateModal(true)}
                        style={{
                            position: "absolute",
                            bottom: "-20px",
                            right: "15px",
                            width: "50px",
                            height: "50px",
                            background: "#2563eb",
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            boxShadow: "0 4px 15px rgba(37,99,235,0.4)",
                            border: "4px solid white",
                            zIndex: 10,
                        }}
                        title="Viết đánh giá"
                    >
                        <i className="fa-solid fa-pen-to-square" style={{color: "white", fontSize: "20px"}}></i>
                    </div>
                )}
            </div>

            {/* DANH SÁCH ĐÁNH GIÁ - GIỮ NGUYÊN */}
            {loading ? (
                <div className="text-center py-5">Đang tải đánh giá...</div>
            ) : reviews.length === 0 ? (
                <div className="text-center py-5 text-muted">Chưa có đánh giá nào</div>
            ) : (
                reviews.map((review) => {
                    const isOwner = currentUser && review.accountId === currentUser.id;

                    return (
                        <div key={review.id} className="indevidual-rating-area">
                            <div className="author-area">
                                <Image
                                    src={review.accountUrl || "/images/instructor/12.jpg"}
                                    width={60}
                                    height={60}
                                    alt={review.accountName}
                                    style={{
                                        width: '60px',
                                        height: '60px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                    }}
                                />
                                <div className="information">
                                    <span>{review.accountName}</span>
                                    <div className="stars">{renderStars(review.rating)}</div>
                                </div>
                            </div>
                            <p className="disc">{review.comment}</p>

                            {isOwner && (
                                <div className="like-love-area">
                                    <a
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleEdit(review.id);
                                        }}
                                        style={{cursor: "pointer"}}
                                    >
                                        <i className="fa-regular fa-pen-to-square"></i>
                                    </a>
                                    <a
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleDelete(review.id);
                                        }}
                                        style={{cursor: "pointer"}}
                                    >
                                        <i className="fa-regular fa-trash-can"></i>
                                    </a>
                                </div>
                            )}
                        </div>
                    );
                })
            )}

            {/* PHÂN TRANG - GIỮ NGUYÊN */}
            {totalElements > paginatePerPage && (
                <div className="row mt--30">
                    <div className="col-lg-12">
                        <div className="rts-pagination-area-2">
                            <ReactPaginate
                                previousLabel={<i className="fa-solid fa-chevron-left"></i>}
                                nextLabel={<i className="fa-solid fa-chevron-right"></i>}
                                breakLabel="..."
                                pageCount={Math.ceil(totalElements / paginatePerPage)}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageChange}
                                forcePage={currentPage}
                                containerClassName="pagination"
                                activeClassName="active"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL VIẾT ĐÁNH GIÁ MỚI - DÙNG STYLE NHƯ MODAL CHỈNH SỬA CŨ */}
            {showCreateModal && (
                <>
                    <div
                        style={{
                            position: "fixed",
                            inset: 0,
                            backgroundColor: "rgba(0,0,0,0.5)",
                            zIndex: 1000,
                        }}
                        onClick={() => setShowCreateModal(false)}
                    />

                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#fff",
                            borderRadius: "12px",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                            zIndex: 1001,
                            width: "500px",
                            maxWidth: "95%",
                            padding: "30px",
                        }}
                    >
                        <h2 style={{fontSize: "24px", fontWeight: "bold", marginBottom: "20px"}}>
                            Viết đánh giá của bạn
                        </h2>

                        <div>
                            <label style={{display: "block", fontWeight: "bold", marginBottom: "8px"}}>
                                Chọn số sao
                            </label>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <InteractiveStars
                                    rating={newReview.rating}
                                    onChange={(v) => setNewReview(prev => ({...prev, rating: v}))}
                                />
                            </div>
                            <small style={{color: "#666", marginTop: "8px", display: "block", textAlign: "center"}}>
                                Đã chọn: <strong>{newReview.rating} sao</strong>
                            </small>
                        </div>

                        <div style={{margin: "20px 0"}}>
                            <label style={{display: "block", fontWeight: "bold", marginBottom: "8px"}}>
                                Nội dung đánh giá
                            </label>
                            <textarea
                                rows={5}
                                value={newReview.comment}
                                onChange={(e) => setNewReview(prev => ({...prev, comment: e.target.value}))}
                                placeholder="Chia sẻ trải nghiệm của bạn về khóa học..."
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    borderRadius: "8px",
                                    border: "1px solid #ccc",
                                    fontSize: "16px",
                                    resize: "vertical",
                                }}
                            />
                        </div>

                        <div style={{display: "flex", justifyContent: "flex-end", gap: "12px"}}>
                            <button
                                onClick={() => setShowCreateModal(false)}
                                style={{
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    backgroundColor: "#ef4444",
                                    color: "#fff",
                                    border: "none",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }}
                            >
                                Hủy
                            </button>
                            <button
                                onClick={submitNewReview}
                                style={{
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    backgroundColor: "#2563eb",
                                    color: "#fff",
                                    border: "none",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }}
                            >
                                Gửi đánh giá
                            </button>
                        </div>
                    </div>
                </>
            )}

            {/* MODAL CHỈNH SỬA - GIỮ NGUYÊN 100% NHƯ CŨ */}
            {modal && (
                <>
                    <div
                        style={{
                            position: "fixed",
                            inset: 0,
                            backgroundColor: "rgba(0,0,0,0.5)",
                            zIndex: 1000,
                        }}
                        onClick={() => setModal(false)}
                    />

                    <div
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            position: "fixed",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#fff",
                            borderRadius: "12px",
                            boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                            zIndex: 1001,
                            width: "500px",
                            maxWidth: "95%",
                            padding: "30px",
                        }}
                    >
                        <h2 style={{fontSize: "24px", fontWeight: "bold", marginBottom: "20px"}}>
                            Chỉnh sửa đánh giá
                        </h2>

                        <div>
                            <label style={{display: "block", fontWeight: "bold", marginBottom: "8px"}}>
                                Chọn số sao
                            </label>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <InteractiveStars
                                    rating={editData.rating}
                                    onChange={(value) => setEditData(prev => ({...prev, rating: value}))}
                                />
                            </div>
                        </div>

                        <div style={{marginBottom: "20px"}}>
                            <label style={{display: "block", fontWeight: "bold", marginBottom: "8px"}}>
                                Bình luận
                            </label>
                            <textarea
                                rows={4}
                                value={editData.comment}
                                onChange={(e) => setEditData(prev => ({...prev, comment: e.target.value}))}
                                placeholder="Viết đánh giá của bạn..."
                                style={{
                                    width: "100%",
                                    padding: "12px",
                                    borderRadius: "8px",
                                    border: "1px solid #ccc",
                                    fontSize: "16px",
                                    resize: "vertical",
                                }}
                            />
                        </div>

                        <div style={{display: "flex", justifyContent: "flex-end", gap: "12px"}}>
                            <button
                                onClick={() => setModal(false)}
                                style={{
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    backgroundColor: "#ef4444",
                                    color: "#fff",
                                    border: "none",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }}
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleSave}
                                style={{
                                    padding: "10px 20px",
                                    borderRadius: "8px",
                                    backgroundColor: "#2563eb",
                                    color: "#fff",
                                    border: "none",
                                    fontWeight: "bold",
                                    cursor: "pointer",
                                }}
                            >
                                Lưu thay đổi
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}