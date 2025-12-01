import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFilterData } from "@/redux/filter/actionCreator";
import categoriesService from "@/service/categoriesService";
import brandService from "@/service/brandService";

export default function CourseSidebar() {
	const dispatch = useDispatch();

	// State lưu trữ bộ lọc người dùng chọn
	const [filters, setFilters] = useState({
		search: "",
		category: [], // lưu id danh mục (Long)
		brand: [],    // lưu id thương hiệu (Long)
		// sau này thêm: priceRange, color, size...
	});

	// State lưu dữ liệu từ API
	const [categories, setCategories] = useState([]);
	const [brands, setBrands] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const [cateRes, brandRes] = await Promise.all([
					categoriesService.getAllCategories(),
					brandService.getAllBrands(),
				]);
				setCategories(cateRes.content || cateRes.data || []);
				setBrands(brandRes.content || brandRes.data || []);
			} catch (err) {
				console.error("Lỗi load filter data:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	// Mỗi khi filters thay đổi → đẩy lên Redux để CourseArea nhận
	useEffect(() => {
		dispatch(setFilterData(filters));
	}, [filters, dispatch]);

	// Xử lý checkbox
	const handleCheckboxChange = (e, type, value) => {
		const checked = e.target.checked;
		setFilters((prev) => ({
			...prev,
			[type]: checked
				? [...prev[type], value]
				: prev[type].filter((item) => item !== value),
		}));
	};

	// Xử lý ô tìm kiếm
	const handleSearchChange = (e) => {
		setFilters((prev) => ({ ...prev, search: e.target.value }));
	};

	// Xóa toàn bộ filter
	const clearFilters = () => {
		setFilters({
			search: "",
			category: [],
			brand: [],
		});
	};

	if (loading) {
		return <div className="rts-course-filter-area">Đang tải bộ lọc...</div>;
	}

	return (
		<div className="rts-course-filter-area">
			{/* Ô tìm kiếm */}
			<div className="single-filter-left-wrapper">
				<h6 className="title">Tìm kiếm sản phẩm</h6>
				<div className="search-filter filter-body">
					<div className="input-wrapper">
						<input
							type="text"
							placeholder="Nhập tên sản phẩm..."
							value={filters.search}
							onChange={handleSearchChange}
						/>
						<i className="fa-light fa-magnifying-glass"></i>
					</div>
				</div>
			</div>

			{/* Danh mục */}
			{categories.length > 0 && (
				<div className="single-filter-left-wrapper">
					<h6 className="title">Danh mục</h6>
					<div className="checkbox-filter filter-body">
						<div className="checkbox-wrapper">
							{categories.map((cat) => (
								<div key={cat.id} className="single-checkbox-filter">
									<div className="check-box">
										<input
											type="checkbox"
											id={`cat-${cat.id}`}
											checked={filters.category.includes(cat.id)}
											onChange={(e) => handleCheckboxChange(e, "category", cat.id)}
										/>
										<label htmlFor={`cat-${cat.id}`}>{cat.name}</label>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}

			{/* Thương hiệu */}
			{brands.length > 0 && (
				<div className="single-filter-left-wrapper">
					<h6 className="title">Thương hiệu</h6>
					<div className="checkbox-filter filter-body">
						<div className="checkbox-wrapper">
							{brands.map((brand) => (
								<div key={brand.id} className="single-checkbox-filter">
									<div className="check-box">
										<input
											type="checkbox"
											id={`brand-${brand.id}`}
											checked={filters.brand.includes(brand.id)}
											onChange={(e) => handleCheckboxChange(e, "brand", brand.id)}
										/>
										<label htmlFor={`brand-${brand.id}`}>{brand.name}</label>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			)}

			{/* Nút xóa filter */}
			{(filters.search || filters.category.length > 0 || filters.brand.length > 0) && (
				<button onClick={clearFilters} className="rts-btn btn-border mt-4">
					<i className="fa-regular fa-x"></i> Xóa tất cả bộ lọc
				</button>
			)}
		</div>
	);
}