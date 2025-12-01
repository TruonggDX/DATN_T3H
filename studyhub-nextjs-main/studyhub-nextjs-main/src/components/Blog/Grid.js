import Image from "next/image";
import Link from "next/link";

export default function SingleBlogGrid( props ) {
	const { blogClass, Slug, Img, Title, Author, Tag, publishedDate, imgWidth, imgHeight  } = props;

	return (
		<div className={blogClass || 'single-blog-style-one'}>
			<Link href={`/blog?tag=${Tag || "business"}`} className="thumbnail">
				<Image src={Img || "/images/blog/01.jpg"} width={imgWidth || "379"} height={imgHeight || "227"} alt={Title || "Blog"} />
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
			<div className="tags-area">
				<span>{Tag || "Marketing"}</span>
			</div>
		</div>
	)
}
