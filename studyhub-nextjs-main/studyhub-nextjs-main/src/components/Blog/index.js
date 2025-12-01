import Image from "next/image";
import Link from "next/link";

export default function SingleBlog( props ) {
	const { blogClass, Slug, Img, Title, Description, Author, Tag, publishedDate, btnText, imgWidth, imgHeight  } = props;

	return (
		<div className={blogClass || 'single-blog-style-one'}>
			<Link href={`blog/${Slug || "details"}`} className="thumbnail">
				<Image src={Img || "/images/blog/01.jpg"} alt="blog" width={imgWidth || 1600} height={imgHeight || 960} />
				<div className="tags-area">
					<span>{Tag || 'Marketing'}</span>
				</div>
			</Link>
			<div className="blog-top-area">
				<div className="single">
					<i className="fa-light fa-calendar-days"></i>
					<p>{publishedDate || 'October 26, 2023'}</p>
				</div>
				<div className="single">
					<i className="fa-light fa-user"></i>
					<p>{Author || 'Jon Adam'}</p>
				</div>
			</div>
			<Link href={`blog/${Slug || "details"}`}>
				<h5 className="title">{Title ? Title : 'Announcing the winners the 2023 Education com Story Challenge!'}</h5>
			</Link>
			<div className="button-area">
				<Link href={`blog/${Slug || "details"}`} className="rts-btn btn-primary readmore-btn">{btnText || 'Read More'} <i className="fa-regular fa-arrow-right"></i></Link>
			</div>
		</div>
	)
}
