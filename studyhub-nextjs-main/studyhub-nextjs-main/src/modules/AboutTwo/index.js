import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import AboutArea from "./AboutArea"

export default function AboutTwoModule() {
	return (
		<main>
			<BreadCrumbs
				Title="About Two"
				subTitle="About Us"
			/>
			<AboutArea />
			<ScrollTop />
		</main>
	)
}
