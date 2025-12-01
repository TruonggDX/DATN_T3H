import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import CourseTwoArea from "./CourseTwoArea"

export default function CourseTwoModule() {
	return (
		<main>
			<BreadCrumbs
				Title="Our Course"
				subTitle="All Course"
			/>
			<CourseTwoArea />
			<ScrollTop />
		</main>
	)
}
