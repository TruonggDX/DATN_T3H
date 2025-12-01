import useShapeMove from "@/hooks/useShapeMove";
import Image from "next/image";
import Link from "next/link";
import { useRef } from 'react';

export default function WhyChooseUs() {
	const shapeMoveRef = useRef(null);
  	useShapeMove(shapeMoveRef);

	return (
		<div className="why-choose-us bg-blue bg-choose-us-one bg_image rts-section-gap shape-move" ref={shapeMoveRef}>
			<div className="container">
				<div className="row align-items-center">
					<div className="col-lg-6">
						<div className="why-choose-us-area-image pb--50">
							<Image className="one" src="/images/why-choose/02.jpg" alt="why-choose" width="225" height="499" />
							<div className="border-img">
								<Image className="two ml--20" src="/images/why-choose/03.jpg" alt="why-choose" width="435" height="434" />
							</div>
							<div className="circle-animation">
								<a className="uni-circle-text uk-background-white dark:uk-background-gray-80 uk-box-shadow-large uk-visible@m" href="#view_in_opensea">
									<svg className="uni-circle-text-path uk-text-secondary uni-animation-spin" viewBox="0 0 100 100" width="200" height="200">
										<defs>
											<path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0">
											</path>
										</defs>
										<text fontSize="11.2">
											<textPath href="#circle">About Univercity • About Collage •</textPath>
										</text>
									</svg>
									<i className="fa-regular fa-arrow-up-right"></i>
								</a>
							</div>
						</div>
					</div>
					<div className="col-lg-6 pl--90 pl_md--15 mt_md--50 pl_sm--15 pt_sm--50">
						<div className="title-area-left-style">
							<div className="pre-title">
								<Image src="/images/banner/bulb-2.png" alt="icon" width="22" height="22" />
								<span>Why Choose Us</span>
							</div>
							<h2 className="title">Studyhub Your Path to
								Excellence & Success</h2>
							<p className="post-title">We are passionate about education and dedicated to providing high- <br /> quality learning resources for learners of all backgrounds.</p>
						</div>
						<div className="why-choose-main-wrapper-1">
							{/* single choose reason */}
							<div className="single-choose-reason-1">
								<div className="icon">
									<Image src="/images/why-choose/icon/01.png" alt="icon" width="32" height="34" />
								</div>
								<h6 className="title">Expert
									Instructors</h6>
							</div>
							{/* single choose reason end */}
							{/* single choose reason */}
							<div className="single-choose-reason-1">
								<div className="icon">
									<Image src="/images/why-choose/icon/02.png" alt="icon" width="32" height="34" />
								</div>
								<h6 className="title">Interactive
									Learning</h6>
							</div>
							{/* single choose reason end */}
							{/* single choose reason */}
							<div className="single-choose-reason-1">
								<div className="icon">
									<Image src="/images/why-choose/icon/03.png" alt="icon" width="32" height="34" />
								</div>
								<h6 className="title">Affordable
									Learning</h6>
							</div>
							{/* single choose reason end */}
							{/* single choose reason */}
							<div className="single-choose-reason-1">
								<div className="icon">
									<Image src="/images/why-choose/icon/04.png" alt="icon" width="32" height="34" />
								</div>
								<h6 className="title">Career
									Advance</h6>
							</div>
							{/* single choose reason end */}
							{/* single choose reason */}
							<div className="single-choose-reason-1">
								<div className="icon">
									<Image src="/images/why-choose/icon/05.png" alt="icon" width="32" height="34" />
								</div>
								<h6 className="title">Course
									Selection</h6>
							</div>
							{/* single choose reason end */}
							{/* single choose reason */}
							<div className="single-choose-reason-1">
								<div className="icon">
									<Image src="/images/why-choose/icon/06.png" alt="icon" width="32" height="34" />
								</div>
								<h6 className="title">Support
									Community</h6>
							</div>
							{/* single choose reason end */}
						</div>
						<Link href="/course" className="rts-btn btn-primary-white with-arrow">
							View All Course <i className="fa-regular fa-arrow-right"></i>
						</Link>
					</div>
				</div>
			</div>
			<div className="shape-image">
				<div className="shape one" data-speed="0.04" data-revert="true">
					<Image src="/images/banner/15.png" alt="" width="59" height="48" />
				</div>
				<div className="shape two" data-speed="0.04">
					<Image src="/images/banner/shape/banner-shape02-w.svg" alt="" width="30" height="45" />
				</div>
				<div className="shape three" data-speed="0.04">
					<Image src="/images/banner/16.png" alt="" width="39" height="43" />
				</div>
			</div>
		</div>
	)
}
