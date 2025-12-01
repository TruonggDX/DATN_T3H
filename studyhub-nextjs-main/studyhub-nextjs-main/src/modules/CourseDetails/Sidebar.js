import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ModalVideo from 'react-modal-video';

export default function CourseDetailsSidebar(props) {
	const {type, item} = props;

	const [isOpen, setOpen] = useState(false);
	const openModal = () => { setOpen(!isOpen); }

	return (
		<>
			{/* right- sticky bar area */}
			<div className={`right-course-details ${type==='two' || type==='four' && "mt--0"}`}>
				<ModalVideo channel='youtube' isOpen={isOpen} videoId='FdrNFEbcsRs' onClose={() => { openModal(); }} />	
				{/* single course-sidebar */}
				<div className="course-side-bar">
					{
						type !== 'two' &&
						<div className="thumbnail">
							<Image src="/images/course/20.jpg" width="400" height="280" alt="" />
							<div className="vedio-icone">
								<a className="video-play-button play-video popup-video" href="#" onClick={() => { openModal(); }}>
									<span></span>
								</a>
							</div>
						</div>
					}
					
					<div className="price-area">
						{
							item.price > 0 ?
							<>
								<h3 className="title">${item.price || "$39.99"}</h3>
								<h4 className="none">${item.prevPrice || "$79.99"}</h4>
								<span className="discount">-50%</span>
							</> :
							<>
                                <h3 className="title animated fadeIn">Free</h3>
                                <span className="discount">100%</span>
							</>
						}
						
					</div>
					<div className="clock-area icon-gap">
						<i className="fa-light fa-clock"></i>
						<span>2 Day left at this price!</span>
					</div>
					{
						item.price > 0 ?
						<>
							<Link href="/cart" className="rts-btn btn-primary">Add To Cart</Link>
							<Link href="#" className="rts-btn btn-border">Buy Now</Link>
						</> :
						<Link href="#" className="rts-btn btn-primary">Enroll Now</Link>
					}

					<div className="what-includes">
						{
							item.price > 0 &&
							<span className="m">30-Day Money-Back Guarantee</span>
						}
						<h5 className="title">This course includes: </h5>
						<div className="single-include">
							<div className="left icon-gap">
								<i className="fa-light fa-chart-bar"></i>
								<span>Levels</span>
							</div>
							<div className="right">
								<span>Beginner</span>
							</div>
						</div>
						<div className="single-include">
							<div className="left icon-gap">
								<i className="far fa-clock"></i>
								<span>Duration</span>
							</div>
							<div className="right">
								<span>6 hours 56 minutes</span>
							</div>
						</div>
						<div className="single-include">
							<div className="left icon-gap">
								<i className="fa-regular fa-floppy-disk"></i>
								<span>Subject</span>
							</div>
							<div className="right">
								<span>Web Development</span>
							</div>
						</div>
						<div className="single-include">
							<div className="left icon-gap">
								<i className="fa-regular fa-pen-to-square"></i>
								<span>Update</span>
							</div>
							<div className="right">
								<span>29 October, 2023 Last Update</span>
							</div>
						</div>
						<div className="single-include">
							<div className="left icon-gap">
								<i className="fa-sharp fa-light fa-file-certificate"></i>
								<span>Certificate</span>
							</div>
							<div className="right">
								<span>Certificate of completion </span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>			
	)
}
