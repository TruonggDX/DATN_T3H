import useShapeMove from "@/hooks/useShapeMove";
import Image from "next/image";
import {useEffect, useRef, useState} from 'react';
import categoriesService from "@/service/categoriesService";
import brandService from "@/service/brandService";
export default function Banner() {
	const shapeMoveRef = useRef(null);
  	useShapeMove(shapeMoveRef);
	const [categories,setCategories] = useState([]);
	const [brands,setBrands] = useState([]);
	useEffect(() => {
		categoriesService.getAllCategories().then(response => {
			setCategories(response.content)
		}).then((e) => console.error(e))
		brandService.getAllBrands().then(response => {
			setBrands(response.content)
		}).then((e) => console.error(e))
	},[])
	return (
		<div className="banner-two-flow-1920">
			<div className="banner-area-one v-2 bg_image shape-move" ref={shapeMoveRef}>
				<div className="container">
					<div className="row">
						<div className="col-lg-6 order-xl-1 order-lg-1 order-md-2 order-sm-2 order-2">
							<div className="banner-content-one">
								<div className="inner">
									<div className="pre-title-banner">
										<Image src="/images/banner/bulb-3.png" alt="icon" width="22" height="22"/>
										<span>Everyday Fashion, Elevated</span>
									</div>

									<h1 className="title-banner">
										Step Into the World of <span></span>
										<span>Trendy Fashion</span>
										<Image src="/images/banner/06.png" alt="banner" width="243" height="14"/>
									</h1>

									<p className="disc">
										Khám phá hàng nghìn mẫu thời trang mới mỗi tuần. Hơn 200.000 khách hàng đã tin
										dùng và lựa chọn phong cách tại cửa hàng của chúng tôi.
									</p>

									<form action="#">
										<div className="category-search-input">
										<div className="select-banner-search-left">
												<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
													<path fillRule="evenodd" clipRule="evenodd" d="M0 0H3V3H0V0ZM6 0H9V3H6V0ZM3 6.00001H0V9.00001H3V6.00001ZM6 6.00001H9V9.00001H6V6.00001ZM3 12H0V15H3V12ZM6 12H9V15H6V12Z" fill="#553CDF" />
													<path d="M15 0H12V3H15V0Z" fill="#553CDF" />
													<path d="M15 6H12V9H15V6Z" fill="#553CDF" />
													<path d="M15 12H12V15H15V12Z" fill="#553CDF" />
												</svg>
												<select className="nice-select" name="price">
													<option>Tất cả danh mục</option>
													{
														categories.map((cate) => (
															<option value="asc" key={cate.id}>{cate.name}</option>
														))
													}
												</select>
											</div>
											<input type="email" placeholder="Tìm kiếm sản phẩm" required />
											<button>Search</button>
										</div>
									</form>
									<div className="banner-tags-wrapper">
										{
											brands.map((brand) => (
												<div className="single-tags-banner">
													<p>{brand.name}</p>
												</div>
											))
										}
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-6 order-xl-2 order-lg-2 order-md-1 order-sm-1 order-1">
							<div className="banner-right-img">
								<Image style={{marginBottom:'60px'}} src="/images/banner/techhome.png" alt="banner" width="663" height="758" />
							</div>
						</div>
					</div>
				</div>
				<div className="review-thumb">
					{/* single review */}
					<div className="review-single">
						<Image src="/images/banner/07.png" alt="banner" width="36" height="34" />
						<div className="info-right">
							<h6 className="title">4.5</h6>
							<span>(2.4k Đánh giá)</span>
						</div>
					</div>
					{/* single review end */}
					{/* single review */}
					<div className="review-single two">
						<Image src="/images/banner/08.png" alt="banner" width="36" height="34" />
						<div className="info-right">
							<h6 className="title">100+
							</h6>
							<span>Sản phẩm</span>
						</div>
					</div>
					{/* single review end */}
				</div>
				{/* banner shape area two */}
				<div className="banner-shape-area-two shape-image">
					<Image src="/images/banner/shape/16.png" data-speed="0.04" alt="one" className=" shape one" width="57" height="57" />
					{/*<Image src="/images/banner/shape/17.png" data-speed="0.04" data-revert="true" alt="two" className=" shape two" width="49" height="74" />*/}
					<Image src="/images/banner/shape/18.png" data-speed="0.04" alt="three" className=" shape three" width="50" height="54" />
					<Image src="/images/banner/shape/19.png" data-speed="0.04" data-revert="true" alt="four" className=" shape four" width="91" height="79" />
				</div>
				{/* banner shape area two end */}
			</div>
		</div>
	)
}
