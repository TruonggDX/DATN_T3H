import SingleCourse from "@/components/Course";
import Image from "next/image";
import { useState } from "react";

import Courses from "@/data/courses.json";

export default function Course() {
	const [activeTab, setActiveTab] = useState("all");

	function handleTab(tab) {
		setActiveTab(tab);
	}

	return (
		<div className="course-area-start rts-section-gap">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="title-between-area">
							<div className="title-area-left-style">
								<div className="pre-title">
									<Image src="/images/banner/bulb.png" alt="icon" width="44" height="44" />
									<span>Courses</span>
								</div>
								<h2 className="title">Explore Featured Courses</h2>
								<p className="post-title">You'll find something to spark your curiosity and enhance</p>
							</div>
							<div className="button-group filters-button-group">
								<button className={`button ${activeTab === "all" && 'is-checked'}`} onClick={() => handleTab('all')}>All Categories</button>
								<button className={`button ${activeTab === "business" && 'is-checked'}`} onClick={() => handleTab('business')}>Business</button>
								<button className={`button ${activeTab === "marketing" && 'is-checked'}`} onClick={() => handleTab('marketing')}>Marketing</button>
								<button className={`button ${activeTab === "music" && 'is-checked'}`} onClick={() => handleTab('music')}>Music</button>
								<button className={`button ${activeTab === "design" && 'is-checked'}`} onClick={() => handleTab('design')}>Design</button>
							</div>
						</div>
					</div>
				</div>
				<div className="ms-portfolio-filter-area main-isotop">
					<div className="portfolio_wrap">
						<div className="filter row g-5 mt--20 portfolio-feed personal">
							{	activeTab === "all" ?
								Courses.map((course, index) => {
									return (
										<div key={index} className="flash transition col-xl-3 col-lg-4 col-md-6 col-sm-6" data-category="transition">
											<SingleCourse
												Slug={course.slug}
												Img={course.img}
												Category={course.category}
												lessonCount={course.lessonCount}
												studentCount={course.studentCount}
												Title={course.title}
												Author={course.authorName}
												ratingCount={course.ratingCount}
												prevPrice={course.prevPrice}
												Price={course.price}
												imgWidth={course.imgWidth}
												imgHeight={course.imgHeight}
											/>
										</div>
									)
								}).slice(0, 8) :
								Courses.filter(course => course.tag === activeTab).map((course, index) => {
									return (
										<div key={index} className="flash transition col-xl-3 col-lg-4 col-md-6 col-sm-6" data-category="transition">
											<SingleCourse
												Slug={course.slug}
												Img={course.img}
												Category={course.category}
												lessonCount={course.lessonCount}
												studentCount={course.studentCount}
												Title={course.title}
												Author={course.authorName}
												ratingCount={course.ratingCount}
												prevPrice={course.prevPrice}
												Price={course.price}
												imgWidth={course.imgWidth}
												imgHeight={course.imgHeight}
											/>
										</div>
									)
								}).slice(0, 8)
							}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
