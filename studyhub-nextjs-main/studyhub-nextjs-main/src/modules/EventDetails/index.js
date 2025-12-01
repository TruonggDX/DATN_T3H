import BreadCrumbs from "@/components/BreadCrumbs";
import ScrollTop from "@/components/ScrollTop";
import EventDetailsArea from "./EventDetailsArea";

export default function EventDetailsModules(singleEvent) {
	
	return (
		<main>
			<BreadCrumbs
				Title="Event Details"
				subTitle={singleEvent.item?.title || "Event Details"}
			/>
			<EventDetailsArea item={singleEvent.item} />
			<ScrollTop />
		</main>
	)
}
