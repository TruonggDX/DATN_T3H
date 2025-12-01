import ScrollTop from "@/components/ScrollTop";
import CourseDetailsBreadcrumbs from "./Breadcrumbs";
import CourseDetailsAreaTwo from "./CourseDetailsAreaTwo";

export default function CourseDetailsModulesThree(singleCourse) {
	return (
		<main>
			<CourseDetailsBreadcrumbs 
				type="three"
				item={singleCourse?.item} 
			/>
			<CourseDetailsAreaTwo 
				type="three"
				item={singleCourse?.item} 
			/>
			<ScrollTop />
		</main>
	)
}
