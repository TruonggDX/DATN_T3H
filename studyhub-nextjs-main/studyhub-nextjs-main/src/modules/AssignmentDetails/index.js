import BreadCrumbs from "@/components/BreadCrumbs";
import ScrollTop from "@/components/ScrollTop";
import AssignmentDetailsArea from "./AssignmentDetailsArea";

export default function AssignmentDetailsModules(singleAssignment) {
	
	return (
		<main>
			<BreadCrumbs
				Title="Assignment Details"
				subTitle={singleAssignment.item?.title || "Assignment Details"}
			/>
			<AssignmentDetailsArea item={singleAssignment.item} />
			<ScrollTop />
		</main>
	)
}
