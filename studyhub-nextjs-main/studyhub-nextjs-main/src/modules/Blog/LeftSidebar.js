import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import BlogArea from "./BlogArea"
import BlogSidebarLeftArea from "./BlogSidebarLeftArea"

export default function BlogModule() {
	return (
		<main>
			<BreadCrumbs
				Title="Blog"
				subTitle="Blog"
			/>
			<BlogSidebarLeftArea />
			<ScrollTop />
		</main>
	)
}
