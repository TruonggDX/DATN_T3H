import BreadCrumbs from "@/components/BreadCrumbs"
import ScrollTop from "@/components/ScrollTop"
import MeetingArea from "./MeetingArea"

export default function ZoomModule() {
	return (
		<main>
			<BreadCrumbs
				Title="Meeting"
				subTitle="Zoom"
			/>
			<MeetingArea />
			<ScrollTop />
		</main>
	)
}
