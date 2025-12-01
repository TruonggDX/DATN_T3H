import Image from "next/image";
import Link from "next/link";

export default function Offer() {

	return (
		<div className="offer-add-area rts-section-gapBottom">
			<div className="container">
				<div className="row g-5">
					<div className="col-lg-6">
						<div className="course-add-single-one bg_image bg-p">
							<div className="title-area-left-style">
								<div className="pre-title">
									<Image src="/images/banner/bulb-4.png" alt="icon" width="22" height="22" />
									<span>New Course </span>
								</div>
								<h2 className="title">Enroll Now and Save Big <br />
									on Quality Learning</h2>
								<Link href="/course" className="rts-btn btn-primary-white">View Course</Link>
							</div>
						</div>
					</div>
					<div className="col-lg-6">
						<div className="course-add-single-one bg_image bg-y">
							<div className="title-area-left-style">
								<div className="pre-title">
									<Image src="/images/banner/bulb-5.png" alt="icon" width="22" height="22" />
									<span>New Course </span>
								</div>
								<h2 className="title">Limited-Time Offer: Enroll <br /> Today for Big Savings</h2>
								<Link href="/course" className="rts-btn btn-primary hov--white">Enroll Now</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
