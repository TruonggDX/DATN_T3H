export default function CourseInfo({ product }) {
	if (!product) return null;

	return (
		<div className="course-content-wrapper">

			<h5 className="title mt-4">Mô tả sản phẩm</h5>
			<div className="disc" dangerouslySetInnerHTML={{__html: product.sortDescription.replace(/\n/g, '<br/>')}}>

			</div>

			<div
				className="disc"
				dangerouslySetInnerHTML={{__html: product.description.replace(/\n/g, '<br/>')}}
			/>
		</div>
	);
}