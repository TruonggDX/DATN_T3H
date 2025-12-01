import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import BlogGridArea from "./BlogGridArea"

export default function BlogGridModule() {
	return (
		<main>
			<BreadCrumbs
				Title="Blog Grid"
				subTitle="Our Blog Grid"
			/>
			<BlogGridArea />
			<ScrollTop />
		</main>
	)
}
