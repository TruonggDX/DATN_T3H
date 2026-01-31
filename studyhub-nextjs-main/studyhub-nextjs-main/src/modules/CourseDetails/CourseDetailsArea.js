// CourseDetailsArea.js (giữ nguyên tên)
import ProductImageCarousel from "./ProductImageCarousel";
import ProductSidebar from "./ProductSidebar";
import CourseInfo from "./CourseInfo";
import CourseReview from "@/modules/CourseDetails/CourseReview";

export default function CourseDetailsArea({ product, variants }) {
	return (
		<div className="py-5">
			<div className="container">
				<div className="row g-5">
					<div className="col-lg-4">
						<ProductImageCarousel images={product?.imageDtos || []}/>
					</div>
					<div className="col-lg-6" style={{marginLeft: '100px'}}>
						<ProductSidebar product={product} variants={variants}/>
					</div>
				</div>

				<div className="row mt-5">
					<div className="col-12">
						<CourseInfo product={product}/>
					</div>
				</div>


				<div className="row mt-5">
					<div className="col-12">
						<h5 className="fw-bold mb-4">Đánh giá</h5>
						<CourseReview product={product}/>
					</div>
				</div>
			</div>
		</div>
	);
}