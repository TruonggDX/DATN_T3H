import ScrollTop from "@/components/ScrollTop";
import CourseDetailsBreadcrumbs from "./Breadcrumbs";
import CourseDetailsAreaFour from "./CourseDetailsAreaFour";

export default function CourseDetailsModulesFour(singleCourse) {
	return (
		<main>
			<CourseDetailsBreadcrumbs 
				type="four"
				item={singleCourse?.item} 
			/>
			<CourseDetailsAreaFour 
				type="four"
				item={singleCourse?.item} 
			/>
			<ScrollTop />
		</main>
	)
}
