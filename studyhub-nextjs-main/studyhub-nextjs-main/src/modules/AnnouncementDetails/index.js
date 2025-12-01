import BreadCrumbs from "@/components/BreadCrumbs";
import ScrollTop from "@/components/ScrollTop";
import AnnouncementDetailsArea from "./AnnouncementDetailsArea";

export default function AnnouncementDetailsModules(singleAnnouncement) {
	
	return (
		<main>
			<BreadCrumbs
				Title="Announcement Details"
				subTitle={singleAnnouncement.item?.title || "Announcement Details"}
			/>
			<AnnouncementDetailsArea item={singleAnnouncement.item} />
			<ScrollTop />
		</main>
	)
}
