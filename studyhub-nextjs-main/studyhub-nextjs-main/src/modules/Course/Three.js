import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import CourseThreeArea from "./CourseThreeArea"

export default function CourseThreeModule() {
	return (
		<main>
			<BreadCrumbs
				Title="Our Course"
				subTitle="All Course"
			/>
			<CourseThreeArea />
			<ScrollTop />
		</main>
	)
}
