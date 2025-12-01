import BreadCrumbs from "@/components/BreadCrumbs";
import ScrollTop from "@/components/ScrollTop";
import InstructorSignUpArea from "./InstructorSignUpArea";

export default function InstructorSignUp() {
	return (
		<main>
			<BreadCrumbs
				Title="Become an Instructor"
				subTitle="Become an Instructor"
			/>
			<InstructorSignUpArea />
			<ScrollTop />
		</main>
	)
}
