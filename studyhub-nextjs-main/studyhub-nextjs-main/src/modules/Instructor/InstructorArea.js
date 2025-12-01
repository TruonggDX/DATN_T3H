import Instructors from "@/data/instructors.json";
import Image from "next/image";
import Link from "next/link";

export default function InstructorArea() {
	return (
		<div className="instrustor-area rts-section-gap">
			<div className="container">
				<div className="row g-5">
					{
						Instructors.map((instructor, index) => {
							return (
								<div key={index} className="col-lg-3 col-md-4 col-sm-6 col-12">
									<div className="single-instructor">
										<div className="thumbnail-img">
											<Link href={`instructor/${instructor?.slug || "details"}`} className="thumbnail">
												<Image src={instructor.img || "/images/instructor/01.jpg"} alt={instructor?.name} width={instructor.imgWidth || "338"} height={instructor?.imgHeight || "374"} />
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
										<Link href={`instructor/${instructor?.slug || "details"}`}>
											<h5 className="title">{instructor?.name || "Elizabeth Olsen"}</h5>
										</Link>
										<p>{instructor?.designation || "Assistant Teacher"}</p>
									</div>
								</div>
							);
						}).slice(0,8)
					}
				</div>
			</div>
      	</div>
	)
}
