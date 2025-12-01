import {useState, useEffect} from "react";
import {formatCurrency} from "@/utils/utils";
import reviewService from "@/service/reviewService";
import {useCart} from "@/hooks/CartContext";
import {toast} from "react-toastify";
import {useRouter} from "next/router";
import orderService from "@/service/orderService";

export default function ProductSidebar({product, variants = []}) {
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);
    useEffect(() => {
        if (variants.length > 0 && !selectedVariant) {
            const firstInStock = variants.find(v => v.quantity > 0) || variants[0];
            setSelectedVariant(firstInStock);
            setQuantity(1);
        }
    }, [variants, selectedVariant]);

    const getDisplayName = (variant) => {
        if (!variant.attributeValues || variant.attributeValues.length === 0) {
            return "Phân loại mặc định";
        }
        const values = variant.attributeValues.map(item => item.value);
        return values.join(" - ");
    };

    const handleSelect = (variant) => {
        if (variant.quantity > 0) {
            setSelectedVariant(variant);
            setQuantity(1);
        }
    };

    const currentPrice = selectedVariant?.price || product?.price || 0;
    const currentStock = selectedVariant?.quantity || 0;

    const [reviews, setReviews] = useState([]);
    const [totalElements, setTotalElements] = useState(0);
    const [total, setTotal] = useState(0)
    useEffect(() => {
        if (!product?.id) return;
        reviewService
            .getAllReviewByProduct(product.id)
            .then((res) => {
                const data = res.data || res;
                setReviews(data.content || []);
                setTotalElements(data.totalElements || 0);
            })
            .catch((err) => {
                console.error("Lỗi load review:", err);
            });
        orderService.getTotalSoldByProductId(product.id).then((res) => {
            setTotal(res.data)
        })
    }, [product?.id]);
    const calculateRatingStats = () => {
        if (reviews.length === 0) {
            return {average: 0, countByStar: {5: 0, 4: 0, 3: 0, 2: 0, 1: 0}};
        }
        let totalRating = 0;
        reviews.forEach((r) => {
            const rating = r.rating || 0;
            totalRating += rating;
        });
        const average = (totalRating / reviews.length).toFixed(1);
        return {average};
    };
    const {average} = calculateRatingStats();
    const {addCart} = useCart();
    const router = useRouter();

    const handleSave = () => {
        const checkToken = localStorage.getItem("jwtToken");
        if (!checkToken) {
            toast.warning("Bạn cần đăng nhập vào hệ thống");
            router.push("/signin");
        } else {
            if (!selectedVariant) {
                alert("Vui lòng chọn phân loại hàng!");
                return;
            }

            const data = {
                number: quantity,
                productId: product.id,
                variantId: selectedVariant.id
            };
            addCart(data);
            toast.success("Thêm thành công!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
                closeButton: false,
                style: {
                    padding: "5px",
                    width: "180px"
                }
            });
        }

    };
    return (
        <div className="sticky-top" style={{top: "20px"}}>
            <h1 style={{
                fontSize: '20px',
                fontWeight: 500,
                color: '#333',
                lineHeight: 1.4,
                margin: '10px 0',
                fontFamily: 'Arial, sans-serif'
            }}>
                {product?.name}
            </h1>

            <div className="d-flex align-items-center gap-3 mb-4 text-warning small">
                <div className="d-flex gap-1">
                    {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fa-star ${i < 4 ? "fa-solid" : "fa-regular"}`}/>
                    ))}
                </div>
                <span className="text-dark fw-bold">{average || "0.0"}</span>
                <span className="text-muted">({totalElements})</span>
                <span className="text-muted ms-3">Đã bán: {total}+</span>
            </div>

            <div className="d-flex align-items-center gap-4 mb-4 small">
                <div className="d-flex align-items-center gap-2 text-muted">
                    <span className="text-dark fw-medium">Thương hiệu:</span>
                    <span className="text-primary fw-bold">
            {product?.brandName || "No Brand"}
        </span>
                </div>

                <div className="text-muted">|</div>

                <div className="d-flex align-items-center gap-2 text-muted">
                    <span className="text-dark fw-medium">Danh mục:</span>
                    <span className="text-danger fw-bold">
            {product?.categoryName || "Chưa phân loại"}
        </span>
                </div>
            </div>

            <div className="bg-light p-4 rounded mb-4">
                {currentPrice > 0 ? (
                    <div className="d-flex align-items-center gap-3">
                        <span className="text-danger fs-1 fw-bold">
                            {formatCurrency(currentPrice)}
                        </span>
                    </div>
                ) : (
                    <span className="text-danger fs-2 fw-bold">
                        Chọn phân loại để xem giá
                    </span>
                )}
            </div>


            <div className="mb-5">
                <div className="d-flex align-items-start gap-4">
                    <span className="text-muted fw-bold" style={{width: "90px", paddingTop: "10px"}}>
                        Phân loại
                    </span>
                    <div className="flex-fill">
                        {variants.length === 0 ? (
                            <div className="text-muted">Chưa có phân loại hàng</div>
                        ) : (
                            <div className="row g-3">
                                {variants.map((v) => {
                                    const displayName = getDisplayName(v);
                                    const isSelected = selectedVariant?.id === v.id;
                                    const outOfStock = v.quantity === 0;

                                    return (
                                        <div key={v.id} className="col-6 col-md-4">
                                            <button
                                                onClick={() => !outOfStock && handleSelect(v)}
                                                disabled={outOfStock}
                                                className={`
                                                w-100 p-3 rounded-2 border text-start position-relative transition-all duration-300
                                                ${isSelected
                                                    ? "border-primary border-3 shadow-sm"
                                                    : "border"
                                                }
                                                ${outOfStock
                                                    ? "opacity-60 bg-light text-muted cursor-not-allowed"
                                                    : "hover:shadow hover:border-primary"
                                                }
                                               `}
                                            >
                                                <div className="fw-bold small">{displayName}</div>
                                                {outOfStock && (
                                                    <div
                                                        className="position-absolute top-0 end-0 bg-secondary text-white px-2 py-1 rounded-bl-sm text-xs">
                                                        Hết hàng
                                                    </div>
                                                )}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="d-flex align-items-center gap-4 mb-5">
                <span className="text-muted fw-bold" style={{width: "90px"}}>Số lượng</span>
                <div className="d-flex align-items-center border rounded-pill overflow-hidden">
                    <button
                        className="btn px-4 py-2"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        disabled={!selectedVariant || quantity <= 1}
                    >−
                    </button>
                    <input
                        type="text"
                        value={quantity}
                        className="text-center border-0 fw-bold"
                        style={{width: "60px"}}
                    />
                    <button
                        className="btn px-4 py-2"
                        onClick={() => setQuantity(quantity + 1)}
                        disabled={!selectedVariant || quantity >= currentStock}
                    >+
                    </button>
                </div>
                <small className="text-success fw-bold">
                    {selectedVariant ? `${currentStock} sản phẩm có sẵn` : "-"}
                </small>
            </div>


            <div className="d-flex gap-3 mt-4" style={{width:'200px'}}>
                <button
                    onClick={handleSave}
                    className="flex-fill btn btn-outline-danger btn-lg rounded-pill py-3 fw-bold shadow-sm d-flex align-items-center justify-content-center gap-2"
                    disabled={!selectedVariant || currentStock === 0}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    Thêm Vào Giỏ Hàng
                </button>
            </div>
        </div>
    );
}