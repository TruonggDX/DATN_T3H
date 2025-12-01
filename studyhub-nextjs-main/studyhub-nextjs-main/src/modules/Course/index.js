import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import CourseArea from "./CourseArea"

export default function CourseModule() {
	return (
		<main>
			<BreadCrumbs
				Title="Sản phẩm của chúng tôi"
				subTitle="Tất cả các sản phẩm"
			/>
			<CourseArea />
			<ScrollTop />
		</main>
	)
}
