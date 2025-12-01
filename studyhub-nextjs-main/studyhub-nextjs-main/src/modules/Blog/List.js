import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import BlogListArea from "./BlogListArea"

export default function BlogListModule() {
	return (
		<main>
			<BreadCrumbs
				Title="Danh sách blog"
				subTitle="Danh sách blog của chúng tôi"
			/>
			<BlogListArea />
			<ScrollTop />
		</main>
	)
}
