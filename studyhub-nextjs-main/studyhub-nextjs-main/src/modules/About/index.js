import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import AboutArea from "./AboutArea"

export default function AboutModule() {
	return (
		<main>
			<BreadCrumbs
				Title="About Us"
				subTitle="About Us"
			/>
			<AboutArea />
			<ScrollTop />
		</main>
	)
}
