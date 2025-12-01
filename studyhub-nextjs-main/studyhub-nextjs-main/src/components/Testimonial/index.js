import Image from "next/image";

export default function SingleTestimonial( props ) {
	const { testimonialClass, Img, Avatar, Author, Position, Content, imgWidth, imgHeight  } = props;

	return (
		<div className={testimonialClass || 'single-students-feedback'}>
			<div className="left-image">
				<Image src={Img || "/images/students-feedback/01.jpg"} alt="feedback" width={imgWidth || 400} height={imgHeight || 420} />
			</div>
			<div className="right-content">
				<Image src={Avatar || "/images/students-feedback/01.png"} alt="feedback" width="46" height="36" />
				<p className="disc">
					{Content || "I can't recommend The Gourmet Haven enough. It's a place for special occasions, date nights, or whenever you're in the mood for a culinary adventure. The combination of exceptional."}
				</p>
				{/* author area */}
				<div className="author-area">
					<ul className="stars">
						<li><i className="fa-sharp fa-solid fa-star"></i></li>
						<li><i className="fa-sharp fa-solid fa-star"></i></li>
						<li><i className="fa-sharp fa-solid fa-star"></i></li>
						<li><i className="fa-sharp fa-solid fa-star"></i></li>
						<li><i className="fa-sharp fa-regular fa-star"></i></li>
					</ul>
					<h5 className="title">{Author || 'Emma Elizabeth'}</h5>
					<span>{Position || 'Assistant Teacher'}</span>
				</div>
				{/* author area end */}
			</div>
		</div>
	)
}
