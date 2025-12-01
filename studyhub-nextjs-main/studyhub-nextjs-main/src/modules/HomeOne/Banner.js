import useShapeMove from "@/hooks/useShapeMove";
import Image from "next/image";
import Link from "next/link";
import { useRef } from 'react';

export default function Banner() {
	const shapeMoveRef = useRef(null);
  	useShapeMove(shapeMoveRef);

	return (
		<div className="banner-area-one shape-move" ref={shapeMoveRef}>
			<div className="container">
				<div className="row">
					<div className="col-lg-6 order-xl-1 order-lg-1 order-sm-2 order-2">
						<div className="banner-content-one">
							<div className="inner">
								<div className="pre-title-banner">
									<Image src="/images/banner/bulb.png" width="22" height="22" alt="icon" />
									<span>Gateway to Lifelong Learning</span>
								</div>
								<h1 className="title-banner">
									Unlock Your Potential <br />
									with <span>Online Learning</span>
									<Image src="/images/banner/02.png" alt="banner" width="170" height="9" />
								</h1>
								<p className="disc">Discover a world of knowledge and opportunities with our online
									education platform pursue a new career.</p>
								<div className="banner-btn-author-wrapper">
									<Link href="/course" className="rts-btn btn-primary with-arrow">View All Course <i className="fa-regular fa-arrow-right"></i></Link>
									<div className="sm-image-wrapper">
										<div className="images-wrap">
											<Image src="/images/banner/shape/06.png" alt="banner" width="46" height="46" />
											<Image className="two" src="/images/banner/shape/07.png" alt="banner" width="56" height="56" />
											<Image className="three" src="/images/banner/shape/08.png" alt="banner" width="56" height="56" />
										</div>
										<div className="info">
											<h6 className="title">2k students</h6>
											<span>Joint our online Class</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-lg-6 order--xl-2 order-lg-2 order-sm-1 order-1">
						<div className="banner-right-img">
							<Image src="/images/banner/01.png" alt="banner" width="635" height="630" />
						</div>
					</div>
				</div>
			</div>
			<div className="review-thumb">
				{/* single review*/}
				<div className="review-single">
					<Image src="/images/banner/03.png" alt="banner" width="52" height="50" />
					<div className="info-right">
						<h6 className="title">4.5</h6>
						<span>(2.4k Review)</span>
					</div>
				</div>
				{/* single review end*/}
				{/* single review*/}
				<div className="review-single two">
					<Image src="/images/banner/04.png" alt="banner" width="49" height="49" />
					<div className="info-right">
						<h6 className="title">100+
						</h6>
						<span>Online Course</span>
					</div>
				</div>
				{/* single review end*/}
			</div>
			<div className="shape-image">
				<div className="shape one" data-speed="0.04" data-revert="true">
					<Image src="/images/banner/shape/banner-shape01.svg" alt="shape_image" width="57" height="42" />
				</div>
				<div className="shape two" data-speed="0.04">
					<Image src="/images/banner/shape/banner-shape02.svg" alt="shape_image" width="49" height="74" />
				</div>
				<div className="shape three" data-speed="0.04">
					<Image src="/images/banner/shape/banner-shape03.svg" alt="shape_image" width="37" height="40" />
				</div>
			</div>
		</div>
	)
}
