import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import BlogArea from "./BlogArea"

export default function BlogModule() {
	return (
		<main>
			<BreadCrumbs
				Title="Blog"
				subTitle="Blog"
			/>
			<BlogArea />
			<ScrollTop />
		</main>
	)
}
