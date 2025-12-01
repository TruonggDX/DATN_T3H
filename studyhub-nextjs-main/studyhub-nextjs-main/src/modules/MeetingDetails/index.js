import BreadCrumbs from "@/components/BreadCrumbs";
import ScrollTop from "@/components/ScrollTop";
import MeetingDetailsArea from "./MeetingDetailsArea";

export default function MeetingDetailsModules(singleMeeting) {
	return (
		<main>
			<BreadCrumbs
				Title="Meeting Details"
				subTitle={singleMeeting.item?.title || "Meeting Details"}
			/>
			<MeetingDetailsArea item={singleMeeting.item} />
			<ScrollTop />
		</main>
	)
}
