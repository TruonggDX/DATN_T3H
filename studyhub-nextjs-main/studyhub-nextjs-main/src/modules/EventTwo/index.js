import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import EventArea from "./EventArea"

export default function EventTwoModule() {
	return (
		<main>
			<BreadCrumbs
				Title="Event Two"
				subTitle="Event"
			/>
			<EventArea />
			<ScrollTop />
		</main>
	)
}
