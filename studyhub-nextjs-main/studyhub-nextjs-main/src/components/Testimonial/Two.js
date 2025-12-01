import Image from "next/image";

export default function SingleTestimonialTwo( props ) {
	const { testimonialClass, Img, Author, Position, Content, imgWidth, imgHeight, QuoteIcon  } = props;

	return (
		<div className={testimonialClass || 'single-testimonials-area-1'}>
			<div className="stars-area stars">
				<i className="fa-solid fa-star"></i>
				<i className="fa-solid fa-star"></i>
				<i className="fa-solid fa-star"></i>
				<i className="fa-solid fa-star"></i>
				<i className="fa-regular fa-star"></i>
			</div>
			<p className="disc">
				{Content || "I can't recommend The Gourmet Haven enough. It's a place for special occasions, date nights, or whenever you're in the mood for a culinary."}
			</p>
			<div className="feedback-author authore-area">
				<Image src={Img || "/images/students-feedback/02.png"} alt="feedback" width={imgWidth || 50} height={imgHeight || 50} />
				<div className="information author">
					<h5 className="title">
						{Author || 'Emma Elizabeth'}
					</h5>
					<span>{Position || 'Assistant Teacher'}</span>
				</div>
			</div>
			{
				QuoteIcon && (
					<div className="quote">
						<Image src={QuoteIcon || "/images/students-feedback/19.png"} width="71" height="56" alt="feedback" />
					</div>
				)
			}
		</div>
	)
}
