import SingleBlogList from "@/components/Blog/List";
import blogService from "../../service/blogsService";
import { useState, useEffect, useCallback } from "react";
import ReactPaginate from 'react-paginate';

export default function BlogListArea() {
	const [blogs, setBlogs] = useState([]);
	const [totalElements, setTotalElements] = useState(0);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(0);
	const pageSize = 4;
	const fetchBlogs = useCallback(async (page = 0) => {
		setLoading(true);
		setError(null);
		try {
			const data = await blogService.getAllBlogs({
				page,
				size: pageSize
			});
			setBlogs(data.content || []);
			setTotalElements(data.totalElements || 0);
		} catch (err) {
			if (!err?.message?.includes('canceled')) {
				console.error("Lỗi tải blog:", err);
				setError("Không thể tải danh sách blog. Vui lòng thử lại sau.");
			}
			setBlogs([]);
			setTotalElements(0);
		} finally {
			setLoading(false);
		}
	}, [pageSize]);
	useEffect(() => {
		fetchBlogs(currentPage);
	}, [fetchBlogs, currentPage]);
	const handlePageChange = ({ selected }) => {
		setCurrentPage(selected);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};
	if (loading) {
		return (
			<div className="rts-latest-blog-area-three rts-section-gap">
				<div className="container">
					<p>Đang tải bài viết...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className="rts-latest-blog-area-three rts-section-gap">
				<div className="container">
					<p className="text-danger">{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="rts-latest-blog-area-three rts-section-gap">
			<div className="container rts-section-gapBottom">
				<div className="row g-5">
					{/* Danh sách blog */}
					{blogs.length > 0 ? (
						blogs.map((blog) => (
							<div key={blog.id} className="col-lg-6">
								<SingleBlogList
									Slug={blog.id}
									Img={blog.imageUrl}
									detailsImg={blog.imageUrl}
									Category={blog.categoryName}
									Tag={blog.categoryName}
									Author={blog.accountName}
									Title={blog.title}
									Description={blog.sortDescription}
									publishedDate={blog.createdDate ? new Date(blog.createdDate).toLocaleDateString('vi-VN') : "Vừa xong"}
									btnText="Đọc thêm"
								/>
							</div>
						))
					) : (
						<div className="col-12 text-center">
							<p>Chưa có bài viết nào.</p>
						</div>
					)}

					{totalElements > pageSize && (
						<div className="col-lg-12">
							<div className="rts-elevate-pagination">
								<ReactPaginate
									breakLabel="..."
									onPageChange={handlePageChange}
									nextLabel={<i className="fa-solid fa-chevron-right"></i>}
									previousLabel={<i className="fa-solid fa-chevron-left"></i>}
									pageRangeDisplayed={4}
									marginPagesDisplayed={1}
									pageCount={Math.ceil(totalElements / pageSize)}
									forcePage={currentPage}
									renderOnZeroPageCount={null}
									containerClassName="pagination"
									pageClassName="page-item"
									pageLinkClassName="page-link"
									previousClassName="page-item"
									previousLinkClassName="page-link"
									nextClassName="page-item"
									nextLinkClassName="page-link"
									activeClassName="active"
								/>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}