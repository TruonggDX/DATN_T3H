import BreadCrumbs from "@/components/BreadCrumbs";
import ScrollTop from "@/components/ScrollTop";
import CourseDetailsAreaFive from "./CourseDetailsAreaFive";

export default function CourseDetailsModulesFive(singleCourse) {
	return (
		<main>
			<BreadCrumbs
				Title="Course Details"
				subTitle="Course Details"
			/>
			<CourseDetailsAreaFive 
				type="five"
				item={singleCourse.item} 
			/>
			<ScrollTop />
		</main>
	)
}
