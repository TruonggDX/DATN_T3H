import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import InstructorArea from "./InstructorArea"

export default function InstructorModule() {
	return (
		<main>
			<BreadCrumbs
				Title="All Instructor"
			/>
			<InstructorArea />
			<ScrollTop />
		</main>
	)
}
