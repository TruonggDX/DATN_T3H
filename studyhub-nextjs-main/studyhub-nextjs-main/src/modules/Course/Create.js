import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import CourseCreateArea from "./CourseCreateArea"

export default function CourseCreateModule() {
	return (
		<main>
			<BreadCrumbs
				Title="Create Course"
				subTitle="Create Course"
			/>
			<CourseCreateArea />
			<ScrollTop />
		</main>
	)
}
