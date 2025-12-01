import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import EventArea from "./EventArea"

export default function EventModule() {
	return (
		<main>
			<BreadCrumbs
				Title="Event"
				subTitle="Event"
			/>
			<EventArea />
			<ScrollTop />
		</main>
	)
}
