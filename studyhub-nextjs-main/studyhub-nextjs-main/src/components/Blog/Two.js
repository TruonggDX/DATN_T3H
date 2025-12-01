import Image from "next/image";
import Link from "next/link";

export default function SingleBlogTwo( props ) {
	const { blogClass, Slug, Img, Title, Description, Author, Tag, publishedDate, btnText, imgWidth, imgHeight  } = props;

	return (
		<div className={blogClass || 'single-blog-style-one blog'}>
			<Link href={`/blog?tag=${Tag || "business"}`} className="thumbnail">
				<Image src={Img || "/images/blog/01.jpg"} width={imgWidth || "1600"} height={imgHeight || "960"} alt={Title || "Blog"} />
				<div className="tags-area">
					<span>{Tag || "Business"}</span>
				</div>
			</Link>
			<div className="blog-top-area">
				<div className="single">
					<i className="fa-light fa-calendar-days"></i>
					<p>{publishedDate || "14 June 2023"}</p>
				</div>
				<div className="single">
					<i className="fa-light fa-user"></i>
					<p>{Author || "Jonathon Lopez"}</p>
				</div>
			</div>
			<Link href={`blog/${Slug || "details"}`}>
				<h5 className="title">{Title || "Azure AI Fundamentals: How to Pass the AI Exam"}</h5>
			</Link>
			<p className="desc">{Description || "You'll find something to spark your curiosity and enhance. We are passionate education dedicated to providing high-quality resources learners. Can offer a description that's tailored to your needs. Whether it's a description for a website, product, service, event, or any other facilities..."}</p>
			<div className="button-area">
				<Link href={`blog/${Slug || "details"}`} className="rts-btn btn-primary readmore-btn">{btnText || 
			"Read More"} <i className="fa-regular fa-arrow-right"></i></Link>
			</div>
		</div>
	)
}
