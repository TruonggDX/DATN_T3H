import Courses from "@/data/courses.json";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CourseContent from "./CourseContent";
import CourseInfo from "./CourseInfo";
import CourseInstructor from "./CourseInstructor";
import CourseReview from "./CourseReview";
import FeatureCourse from "./FeatureCourse";
import RelatedCourse from "./RelatedCourse";
import CourseDetailsSidebarTwo from "./SidebarTwo";

export default function CourseDetailsAreaFive(props) {
	let {type, item} = props;
	if (!item) {
		item = Courses[0]
	}
	const [activeTab, setActiveTab] = useState("info");

	function handleTab(tab) {
		setActiveTab(tab);
	}

	return (
		<>
			<div className="rts-course-area rts-section-gap">
				<div className="container">
					<div className="row g-5">
						<div className="col-xl-8 col-lg-12 order-xl-1 order-lg-2 order-md-2 order-sm-2 order-2">
							<div className="single-course-style-five">
								<h2 className="title">{item.title || "The Complete Web Developer in 2023: Zero to Mastery"}</h2>
								<div className="instructor-main-wrapper-course-single">
									<div className="instructor-area  single-instructor-rating">
										<Image src="/images/instructor/01.png" width={50} height={50} alt="instructor" />
										<div className="information">
											<span className="desig">Instructor:</span>
											<Link href="#" className="name">{item.author ||  "William U. Jack"}</Link>
										</div>
									</div>
									<div className="category single-instructor-rating">
										<span>Categories:</span>
										<h6 className="title">{item.category || "Web Developments"}</h6>
									</div>
									<div className="review single-instructor-rating">
										<span>Reviews:</span>
										<div className="rating-area">
											<span>{item.ratingCount || "4.5"}</span>
											<i className="fa-solid fa-star"></i>
											<i className="fa-solid fa-star"></i>
											<i className="fa-solid fa-star"></i>
											<i className="fa-solid fa-star"></i>
											<i className="fa-solid fa-star"></i>
										</div>
									</div>
									<div className="buy-now-area single-instructor-rating">
										<h4 className="price">${item.price || "56.00"}</h4>
										<Link href="#" className="rts-btn btn-primary">Buy Now</Link>
									</div>
								</div>
								<div className="course-area-wrapper ptb--50">
									<div className="thumbnail-area">
										<Image src={item.detailsImg || "/images/course/26.jpg"} width={950} height={500} alt="" />
									</div>
								</div>
							</div>
							<div className="course-details-btn-wrapper full-width pb--50">
								<ul className="nav nav-tabs" id="myTab" role="tablist">
									<li className="nav-item" role="presentation">
										<button className={`nav-link ${activeTab === "info" && 'active'}`} onClick={() => handleTab('info')}>Course Information</button>
									</li>
									<li className="nav-item" role="presentation">
										<button className={`nav-link ${activeTab === "content" && 'active'}`} onClick={() => handleTab('content')}>Course Content</button>
									</li>
									<li className="nav-item" role="presentation">
										<button className={`nav-link ${activeTab === "instructor" && 'active'}`} onClick={() => handleTab('instructor')}>Instructor</button>
									</li>
									<li className="nav-item" role="presentation">
										<button className={`nav-link ${activeTab === "review" && 'active'}`} onClick={() => handleTab('review')}>Review</button>
									</li>
								</ul>
							</div>
							<div className="tab-content mt--50" id="myTabContent">
								{
									activeTab === "content" ?
										<CourseContent /> :
										activeTab === "instructor" ?
											<CourseInstructor /> :
											activeTab === "review" ?
												<CourseReview /> :
												<CourseInfo />
								}
							</div>
							<RelatedCourse />
						</div>
						<div className="col-lg-4 order-cl-2 order-lg-2 order-md-1 order-sm-1 order-1  rts-sticky-column-item">
							<CourseDetailsSidebarTwo
								type={type}
								item={item}
							/>
						</div>
					</div>
				</div>
			</div>
			<FeatureCourse />
		</>
	)
}
