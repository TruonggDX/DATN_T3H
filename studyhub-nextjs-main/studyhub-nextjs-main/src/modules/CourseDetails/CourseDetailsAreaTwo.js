import Courses from "@/data/courses.json";
import AboutVideo from "./AboutVideo";
import CourseContent from "./CourseContent";
import CourseInfo from "./CourseInfo";
import CourseInstructor from "./CourseInstructor";
import CourseReview from "./CourseReview";
import RelatedCourse from "./RelatedCourse";
import CourseDetailsSidebar from "./Sidebar";

export default function CourseDetailsAreaTwo(props) {
	let {type, item} = props;
	if (!item) {
		item = Courses[0]
	}

	return (
		<div className="rts-course-area rts-section-gap">
			<div className="container">
				<div className="row g-5">
					<div className="col-lg-8 order-cl-1 order-lg-1 order-md-2 order-sm-2 order-2">
						<AboutVideo />
						<CourseInfo />
						<CourseContent />
						<CourseInstructor />
						<CourseReview />
						{
							type === 'three' &&
							<RelatedCourse />
						}
					</div>
					<div className="col-lg-4 order-cl-2 order-lg-2 order-md-1 order-sm-1 order-1  rts-sticky-column-item">
						<CourseDetailsSidebar
							type="two"
							item={item}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}
