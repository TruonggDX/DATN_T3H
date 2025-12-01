import ScrollTop from "@/components/ScrollTop";
import InstructorDetailsArea from "./InstructorDetailsArea";

export default function InstructorDetailsModules(singleInstructor) {
	
	return (
		<main>
			<InstructorDetailsArea item={singleInstructor.item} />
			<ScrollTop />
		</main>
	)
}
