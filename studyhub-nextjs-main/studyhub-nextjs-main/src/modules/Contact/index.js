import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import ContactArea from "./ContactArea"

export default function ContactModule() {
	return (
		<>
			<BreadCrumbs
				Title="Liên hệ"
				subTitle="Liên hệ"
			/>
			<ContactArea/>
			<ScrollTop />
		</>
	)
}
