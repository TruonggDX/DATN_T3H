import SingleBlog from "@/components/Blog";
import Blogs from "@/data/blogs.json";
import Image from "next/image";

export default function Blog() {

	return (
		<div className="rts-section-gap rts-blog-area">
			<div className="container pb--130">
				<div className="row">
					<div className="col-lg-12">
						<div className="title-area-center-style">
							<div className="pre-title">
								<Image src="/images/banner/bulb.png" alt="icon" width="44" height="44" />
								<span>News & Article</span>
							</div>
							<h2 className="title">Read Our Latest News</h2>
							<p className="post-title"> Our mission is to provide you with valuable insights</p>
						</div>
					</div>
				</div>
				<div className="row g-5 mt--20">
					{
						Blogs.map((blog, index) => {
							return (
								<div key={index} className="col-lg-4 col-md-6 col-sm-12">
									<SingleBlog
										Slug={blog.slug}
										Img={blog.image}
										detailsImg={blog.detailsImg}
										Category={blog.category}
										Tag={blog.tag}
										Author={blog.author}
										Title={blog.title}
										publishedDate={blog.publishedDate}
										btnText={blog.btnText}
									/>
								</div>
							);
						}).slice(0, 3)
					}
				</div>
			</div>
		</div>
	)
}
