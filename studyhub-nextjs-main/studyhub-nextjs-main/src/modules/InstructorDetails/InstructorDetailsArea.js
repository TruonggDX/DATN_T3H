import SingleCourse from "@/components/Course";
import Courses from "@/data/courses.json";
import Instructors from "@/data/instructors.json";
import Image from "next/image";
import Link from "next/link";

export default function InstructorDetailsArea({item}) {
	if (!item) {
		item = Instructors[0]
	}
	const { img, name, position, biography, studentCount, lectureCount, ratingCount } = item;

	return (
		<>
			<div className="dashboard-banner-area-wrapper">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="dashboard-banner-area-start bg_image">
								<div className="rating-area-banner-dashboard">
									<div className="stars">
										<span>{ratingCount || "4.5"}</span>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-solid fa-star"></i>
										<i className="fa-regular fa-star"></i>
									</div>
									<p>{position || "Digital Marketing Instructor"}</p>
									<Link href="/course/create" className="create-btn"><i className="fa-regular fa-circle-plus"></i> Create a New Course</Link>
								</div>
								<div className="author-profile-image-and-name">
									<div className="profile-pic">
										<Image src={img || "/images/dashboard/01.png"} width="200" height="200" alt="dashboard" />
									</div>
									<div className="name-desig">
										<h1 className="title">{name || "Jon Adam"}</h1>
										<div className="course-vedio">
											<div className="single">
												<i className="fa-light fa-users"></i>
												<span>{studentCount || "1350"} Students</span>
											</div>
											<div className="single">
												<i className="fa-regular fa-video"></i>
												<span>{lectureCount || "1350"} Lectures</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="rts-instructor-profile rts-section-gapBottom pt--50">
				<div className="container">
					<div className="row">
						<div className="col-lg-3">

						</div>
						<div className="col-lg-9">
							<div className="instructor-profile-right-area-start">
								<div className="bio-graphyarea">
									<h5 className="title">Biography</h5>
									<p className="disc">
										{biography || "As an English lecturer, I am fervently dedicated to shaping the linguistic and literary acumen of my students. With a profound passion for language education, I employ dynamic and innovative teaching methods to inspire a love for literature and effective communication. My commitment extends beyond the curriculum, fostering an environment where students develop critical thinking skills and a deep appreciation for the nuances of the English language."}
									</p>
									<div className="social-area-dashboard-footer">
										<ul>
											<li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
											<li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
											<li><a href="#"><i className="fa-brands fa-linkedin"></i></a></li>
											<li><a href="#"><i className="fa-brands fa-pinterest"></i></a></li>
											<li><a href="#"><i className="fa-brands fa-youtube"></i></a></li>
										</ul>
									</div>
								</div>
								<div className="row g-5 mt--30">
									{
										Courses.map((course, index) => {
											return (
												<div key={index} className="col-lg-4 col-md-6 col-sm-12 col-12">
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
										}).slice(0, 6)
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
