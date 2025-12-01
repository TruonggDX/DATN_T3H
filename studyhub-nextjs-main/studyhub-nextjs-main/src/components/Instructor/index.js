import Image from "next/image";
import Link from "next/link";

export default function SingleInstructor( props ) {
	const { instructorClass, Slug, Img, Title, Designation, imgWidth, imgHeight  } = props;

	return (
		<div className={instructorClass || 'single-instructor'}>
			<div className="single-instructor">
				<div className="thumbnail-img">
					<Link href={`/instructor/${Slug || 'details'}`} className="thumbnail">
						<Image src={Img || '/images/instructor/01.jpg'} alt="instructor" width={imgWidth || 338} height={imgHeight || 374} />
					</Link>
					<div className="social-img-instructor">
						<ul>
							<li><a href="#"><i className="fa-sharp fa-light fa-share-nodes"></i></a></li>
							<li className="bottom"><a href="#"><i className="fa-brands fa-skype"></i></a></li>
							<li className="bottom"><a href="#"><i className="fa-brands fa-linkedin"></i></a></li>
							<li className="bottom"><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
						</ul>
					</div>
				</div>
				<Link href={`/instructor/${Slug || 'details'}`}>
					<h5 className="title">{Title || 'Emma Elizabeth'}</h5>
				</Link>
				<p>{Designation || 'Assistant Teacher'}</p>
			</div>
		</div>
	)
}
