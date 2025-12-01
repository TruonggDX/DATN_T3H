import BlogSidebar from "@/components/Blog/BlogSidebar";
import Image from "next/image";

export default function BlogDetailsArea({item}) {
    console.log('item',item)
	if (!item) return null;

	return (
		<div className="rts-blog-list-area rts-section-gap">
			<div className="container">
				<div className="row g-5">
					{/* rts blo post area */}
					<div className="col-xl-8 col-md-12 col-sm-12 col-12">
						{/* single post */}
						<div className="blog-single-post-listing details mb--0">
							<div className="thumbnail">
								<Image src={item.imageUrl || "/images/blog/03.jpg"} width="1600" height="960" alt="Business-Blog" />
							</div>
							<div className="blog-listing-content">
								<div className="user-info">
									{/* single info */}
									<div className="single">
										<i className="far fa-user-circle"></i>
										<span> {item.accountName || "David Smith"}</span>
									</div>
									{/* single info end */}
									{/* single info */}
									<div className="single">
										<i className="far fa-clock"></i>
										<span>{item.createdDate ? new Date(item.createdDate).toLocaleDateString('vi-VN') : "Vừa xong"}</span>
									</div>
									{/* single info end */}
									{/* single info */}
									<div className="single">
										<i className="far fa-tags"></i>
										<span>{item.categoryName}</span>
									</div>
									{/* single info end */}
								</div>
								<h3 className="title animated fadeIn">{item.title || "Profitable business makes your profit"}</h3>
								<div className="disc">
									{item.description
										?.split("\n")
										.map((line, index) => (
											<p key={index} className="para-1">
												{line}
											</p>
										))
									}
								</div>

							</div>
						</div>
						{/* single post End*/}
					</div>
					{/* rts-blog post end area */}
					{/*rts blog wizered area */}
					<div className="col-xl-4 col-md-12 col-sm-12 col-12 rts-sticky-column-item">
						<BlogSidebar />
					</div>
					{/* rts- blog wizered end area */}
				</div>
			</div>
		</div>
	)
}
