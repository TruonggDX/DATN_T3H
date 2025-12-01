import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import CartArea from "./CartArea"

export default function CartModules() {
	return (
		<main>
			<BreadCrumbs
				Title="Giỏ hàng"
				subTitle="Giỏ hàng"
			/>
			<CartArea />
			<ScrollTop />
		</main>
	)
}
