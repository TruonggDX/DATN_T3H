import Courses from "@/data/courses.json";
import Image from "next/image";
import Link from "next/link";

export default function CourseDetailsSidebarTwo(props) {
	const {type, item} = props;

	return (
		<>
			{/* right- sticky bar area */}
			<div className="right-course-details mt--0">
				<div className="rts-course-category-area">
					<div className="single-filter-left-wrapper">
						<h5 className="title">Category</h5>
						<div className="checkbox-filter filter-body">
							<div className="checkbox-wrapper">
								{/* single check box */}
								<div className="single-checkbox-filter">
									<div className="check-box">
										<input type="checkbox" id="category-1" />
										<label for="category-1">Web Development</label><br />
									</div>
									<span className="number">(130)</span>
								</div>
								{/* single check box end */}
								{/* single check box */}
								<div className="single-checkbox-filter">
									<div className="check-box">
										<input type="checkbox" id="category-2" />
										<label for="category-2">Film &amp; Video</label><br />
									</div>
									<span className="number">(85)</span>
								</div>
								{/* single check box end */}
								{/* single check box */}
								<div className="single-checkbox-filter">
									<div className="check-box">
										<input type="checkbox" id="category-3" />
										<label for="category-3">Illustration</label><br />
									</div>
									<span className="number">(210)</span>
								</div>
								{/* single check box end */}
								{/* single check box */}
								<div className="single-checkbox-filter">
									<div className="check-box">
										<input type="checkbox" id="category-4" />
										<label for="category-4">Music &amp; Art</label><br />
									</div>
									<span className="number">(45)</span>
								</div>
								{/* single check box end */}
								{/* single check box */}
								<div className="single-checkbox-filter">
									<div className="check-box">
										<input type="checkbox" id="category-5" />
										<label for="category-5">Photography</label><br />
									</div>
									<span className="number">(35)</span>
								</div>
								{/* single check box end */}
								{/* single check box */}
								<div className="single-checkbox-filter">
									<div className="check-box">
										<input type="checkbox" id="category-6" />
										<label for="category-6">Business &amp; Marketing</label><br />
									</div>
									<span className="number">(66)</span>
								</div>
								{/* single check box end */}
								{/* single check box */}
								<div className="single-checkbox-filter">
									<div className="check-box">
										<input type="checkbox" id="category-7" />
										<label for="category-7">Design &amp; UI/UX</label><br />
									</div>
									<span className="number">(95)</span>
								</div>
								{/* single check box end */}
								{/* single check box */}
								<div className="single-checkbox-filter">
									<div className="check-box">
										<input type="checkbox" id="category-8" />
										<label for="category-8">Web Design</label><br />
									</div>
									<span className="number">(150)</span>
								</div>
								{/* single check box end */}
							</div>
						</div>
					</div>
				</div>
				<div className="our-latest-course-start-right-side-bar">
					<h5 className="title">Latest Course</h5>
					{/* single course list  */}
					{
						Courses.map((course, index) => {
							return (
								<div key={`l-${index}`} className="single-course-list-wrapper">
									<Link href={`/course/${course.slug || "course-details"}`} className="thumbnail">
										<Image src={course.img || "/images/course/23.jpg"} width={100} height={100} alt="course" />
									</Link>
									<div className="inner-content">
										<Link href={`/course/${course.slug || "course-details"}`}>
											<h6 className="title">{course.title || "The Complete Web Developer in 2023: Zero to Mastery"}</h6>
										</Link>
										<div className="pricing-area">
											<span className="none">${course.prevPrice || "56.99"}</span>
											<span>${course.price || "99.99"}</span>
										</div>
									</div>
								</div>
							)
						}).slice(0,3)
					}
					{/* single course list end */}
				</div>
				
				<div className="course-side-bar">
					<div className="what-includes">
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
				<div className="add-area-sidebar mt--50">
					<div className="thumbnail">
						<Image src="/images/course/add.jpg" width={409} height={500} alt="course" />
						<div className="content">
							<h4 className="title">Studyhub Course Selling <br /> Upto 30% Off</h4>
							<Link href="#" className="rts-btn btn-primary black">Buy Now</Link>
						</div>
					</div>
				</div>
				{/* single course-sidebar end */}
			</div>
		</>			
	)
}
