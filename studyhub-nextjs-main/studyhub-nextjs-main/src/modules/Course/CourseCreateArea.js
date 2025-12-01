import CourseAttachment from "./create/Attachment";
import CourseBuilder from "./create/Builder";
import CourseData from "./create/Data";
import CourseInfo from "./create/Info";
import CourseTemplate from "./create/Template";
import CourseCreateSidebar from "./CreateSidebar";

export default function CourseCreateArea() {

	return (
		<div className="crea-te-course-area-start ptb--100">
			<div className="container">
				<div className="row g-5">
					<div className="col-lg-8">
						<div className="create-course-area-main-wrapper-inner">
							<CourseInfo />
							<CourseBuilder />
							<CourseAttachment />
							<CourseData />
							<CourseTemplate />
						</div>
					</div>
					<div className="col-lg-4 rts-sticky-column-item">
						<CourseCreateSidebar />
					</div>
				</div>
			</div>
		</div>
	)
}
