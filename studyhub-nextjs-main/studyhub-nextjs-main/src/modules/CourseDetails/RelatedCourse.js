import SingleCourse from "@/components/Course";
import Courses from "@/data/courses.json";
import Link from "next/link";

export default function RelatedCourse({}) {

	return (
		<div className="wrapper-bottom-course-details-page g-5 row mt--50 pr--60 pr_sm--0 pl_sm--0">
			<div className="title-between-area pr--150">
				<h5 className="title mb-0">More Courses by William U.</h5>
				<Link href="/course" className="rts-btn with-arrow p-0">View All Course <i className="fa-light fa-arrow-right"></i></Link>
			</div>
			{
				Courses.map((course, index) => {
					return (
						<div key={index} className="col-lg-5 col-md-6 col-sm-12">
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
					);
				}).slice(0,2)
			}
		</div>

	)
}
