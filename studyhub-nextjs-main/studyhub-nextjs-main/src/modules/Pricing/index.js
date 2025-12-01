import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import PricingArea from "./PricingArea"

export default function PricingModule() {
	return (
		<main>
			<BreadCrumbs
				Title="Membership Plan"
				subTitle="Pricing"
			/>
			<PricingArea />
			<ScrollTop />
		</main>
	)
}
