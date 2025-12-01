import Link from "next/link";

export default function CourseDetailsBreadcrumbs({ product }) {
	if (!product) return null;

	return (
		<div className="bg-white border-bottom">
			<div className="container py-3">
				<nav className="small">
					<Link href="/" className="text-decoration-none text-muted">Trang chủ</Link>
					<span className="mx-2 text-muted">›</span>
					<span>Chi tiết sản phẩm</span>
				</nav>
			</div>
		</div>
	);
}