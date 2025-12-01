// components/product/ProductInfo.js
import Image from "next/image";
import { useState, useEffect } from "react";

export default function CourseInfo({ product, variants, attributeValues }) {
	const [selectedVariant, setSelectedVariant] = useState(null);
	const [selectedColor, setSelectedColor] = useState(null);
	const [selectedSize, setSelectedSize] = useState(null);
	const [quantity, setQuantity] = useState(1);
	const [mainImage, setMainImage] = useState(product.imageDtos[0]?.url);

	// Giả sử bạn đã map được attributeValues từ backend
	// Ví dụ: colors = [{id:2, value:"Đen", colorCode:"#000000"}, ...]
	//        sizes = ["S", "M", "L", "XL"]

	const colors = [...new Set(variants.map(v => {
		const colorId = v.attributeValuesId.find(id =>
			attributeValues.find(av => av.id === id && av.attributeName === "Màu sắc")
		);
		const attr = attributeValues.find(a => a.id === colorId);
		return attr ? { id: attr.id, name: attr.value, code: attr.colorCode || null } : null;
	}).filter(Boolean))];

	const sizes = [...new Set(variants.map(v => {
		const sizeId = v.attributeValuesId.find(id =>
			attributeValues.find(av => av.id === id && av.attributeName === "Kích thước")
		);
		const attr = attributeValues.find(a => a.id === sizeId);
		return attr?.value || null;
	}).filter(Boolean))];

	// Khi chọn màu + size → tìm variant khớp
	useEffect(() => {
		if (selectedColor && selectedSize) {
			const matched = variants.find(v => {
				const hasColor = v.attributeValuesId.includes(selectedColor);
				const sizeId = attributeValues.find(a => a.value === selectedSize && a.attributeName === "Kích thước")?.id;
				const hasSize = sizeId ? v.attributeValuesId.includes(sizeId) : false;
				return hasColor && hasSize;
			});
			setSelectedVariant(matched || null);
		} else if (selectedColor && !selectedSize) {
			// Chỉ chọn màu → lấy variant đầu tiên có màu đó
			const matched = variants.find(v => v.attributeValuesId.includes(selectedColor));
			setSelectedVariant(matched || null);
		} else {
			setSelectedVariant(null);
		}
	}, [selectedColor, selectedSize, variants, attributeValues]);

	const inStock = selectedVariant ? selectedVariant.quantity > 0 : false;

	return (
		<div className="product-info-sidebar sticky-top">
			<h1 className="product-title">{product.name}</h1>

			<div className="product-brand">
				Thương hiệu: <span className="fw-bold text-primary">{product.brandName}</span>
			</div>

			<div className="product-rating my-3">
				<span>★★★★☆</span> <small className="text-muted">(128 đánh giá)</small>
			</div>

			{/* Giá */}
			<div className="product-price-wrapper my-4">
				{selectedVariant ? (
					<div className="price fs-2 fw-bold text-danger">
						{selectedVariant.price.toLocaleString("vi-VN")}₫
					</div>
				) : (
					<div className="price-range text-danger fs-4">
						Từ {(Math.min(...variants.map(v => v.price))).toLocaleString("vi-VN")}₫
					</div>
				)}
			</div>

			{/* Chọn màu */}
			<div className="variant-group mb-4">
				<label className="form-label fw-bold">Màu sắc:
					{selectedColor && <span className="text-primary ms-2">
            {attributeValues.find(a => a.id === selectedColor)?.value}
          </span>}
				</label>
				<div className="color-swatches d-flex gap-3 flex-wrap">
					{colors.map(color => (
						<button
							key={color.id}
							onClick={() => setSelectedColor(color.id)}
							className={`color-swatch ${selectedColor === color.id ? 'active' : ''}`}
							style={{
								background: color.code || '#ccc',
								border: selectedColor === color.id ? '3px solid #000' : '2px solid #ddd'
							}}
							title={color.name}
						>
							{color.code && <span className="visually-hidden">{color.name}</span>}
						</button>
					))}
				</div>
			</div>

			{/* Chọn size */}
			<div className="variant-group mb-4">
				<label className="form-label fw-bold">Kích thước:</label>
				<div className="size-buttons d-flex gap-2 flex-wrap">
					{sizes.map(size => {
						const sizeId = attributeValues.find(a => a.value === size && a.attributeName === "Kích thước")?.id;
						const isAvailable = variants.some(v =>
							v.attributeValuesId.includes(sizeId) &&
							(!selectedColor || v.attributeValuesId.includes(selectedColor))
						);
						return (
							<button
								key={size}
								onClick={() => setSelectedSize(size)}
								disabled={!isAvailable}
								className={`btn btn-lg ${selectedSize === size ? 'btn-dark' : 'btn-outline-dark'} 
                           ${!isAvailable ? 'opacity-50' : ''}`}
							>
								{size}
							</button>
						);
					})}
				</div>
			</div>

			{/* Tồn kho */}
			{selectedVariant && (
				<div className="stock-info mb-3 text-success">
					Còn {selectedVariant.quantity} sản phẩm
				</div>
			)}

			{/* Số lượng */}
			<div className="quantity-selector mb-4 d-flex align-items-center gap-3">
				<button className="btn btn-outline-secondary" onClick={() => setQuantity(Math.max(1, quantity-1))}>-</button>
				<input type="number" value={quantity} readOnly className="form-control text-center" style={{width: '70px'}} />
				<button className="btn btn-outline-secondary" onClick={() => setQuantity(quantity+1)}>+</button>
			</div>

			{/* Nút hành động */}
			<div className="action-buttons">
				<button
					className={`btn btn-danger btn-lg w-100 mb-3 ${!inStock ? 'btn-secondary' : ''}`}
					disabled={!inStock}
				>
					{inStock ? "Thêm vào giỏ hàng" : "Hết hàng"}
				</button>
				<button className="btn btn-outline-dark btn-lg w-100">
					Mua ngay
				</button>
			</div>

			{/* Chính sách */}
			<div className="policy mt-4 text-muted small">
				<div>7 ngày đổi trả</div>
				<div>Miễn phí vận chuyển đơn từ 300k</div>
				<div>Giảm thêm 5% khi thanh toán online</div>
			</div>
		</div>
	);
}