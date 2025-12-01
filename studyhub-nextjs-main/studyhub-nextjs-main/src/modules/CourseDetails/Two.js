import ScrollTop from "@/components/ScrollTop";
import CourseDetailsBreadcrumbs from "./Breadcrumbs";
import CourseDetailsAreaTwo from "./CourseDetailsAreaTwo";

export default function CourseDetailsModulesTwo(singleCourse) {
	return (
		<main>
			<CourseDetailsBreadcrumbs 
				item={singleCourse?.item} 
			/>
			<CourseDetailsAreaTwo item={singleCourse?.item} />
			<ScrollTop />
		</main>
	)
}
