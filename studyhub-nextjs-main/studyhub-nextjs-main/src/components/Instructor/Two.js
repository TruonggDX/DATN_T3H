import Image from "next/image";
import Link from "next/link";

export default function SingleInstructorTwo( props ) {
	const { instructorClass, Slug, Img, Title, Position, Biography, imgWidth, imgHeight, ratingCount, lectureCount, studentCount  } = props;

	return (
		<div className={instructorClass || 'single-instructor-area-details mt--40'}>
			<Link href={`/instructor/${Slug || 'details'}`} className="thumbnail">
				<Image src={Img || '/images/instructor/01.jpg'} alt="instructor" width={imgWidth || 205} height={imgHeight || 205} />
			</Link>
			<div className="inner-instrustor-area">
				<h5 className="title">{Title || 'William U.'}</h5>
				<span className="deg">{Position || 'Advanced Educator'}</span>
				<div className="stars-area-wrapper">
					<div className="stars-area">
						<span>{ratingCount || '4.5'}</span>
						<i className="fa-solid fa-star"></i>
						<i className="fa-solid fa-star"></i>
						<i className="fa-solid fa-star"></i>
						<i className="fa-solid fa-star"></i>
						<i className="fa-regular fa-star"></i>
					</div>
					<div className="users-area icon-gap">
						<i className="fa-light fa-users"></i>
						<span>{studentCount || "1350"} Students</span>
					</div>
					<div className="users-area icon-gap">
						<i className="fa-light fa-video"></i>
						<span>{lectureCount || "26"} Courses</span>
					</div>
				</div>
				<p className="disc">
					{Biography || "William U. Peña, MBA, CISSP No. 349867, is a former college professor and the lead instructor at Dion Training Solutions."}
				</p>
				<div className="follow-us">
					<span>Follow</span>
					<ul>
						<li><a href="#"><i className="fa-brands fa-facebook"></i></a></li>
						<li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
						<li><a href="#"><i className="fa-brands fa-linkedin"></i></a></li>
						<li><a href="#"><i className="fa-brands fa-pinterest"></i></a></li>
						<li><a href="#"><i className="fa-brands fa-youtube"></i></a></li>
					</ul>
				</div>
			</div>
		</div>
	)
}
