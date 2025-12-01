import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import CourseFourArea from "./CourseFourArea"

export default function CourseFourModule() {
	return (
		<main>
			<BreadCrumbs
				Title="Sản phẩm"
				subTitle="Tất cả sản phẩm"
			/>
			<CourseFourArea />
			<ScrollTop />
		</main>
	)
}
