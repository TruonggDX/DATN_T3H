import SingleMeeting from "@/components/Meeting";
import Meetings from "@/data/meetings.json";

export default function MeetingArea() {
	return (
		<div className="rts-zoom-meeting-area rts-section-gapTop">
			<div className="container pb_md--100 pb_sm--80">
				<div className="row g-5">
					{
						Meetings.map((meeting) => {
							return (
								<div className="col-lg-4 col-md-6 col-sm-6 col-12">
									<SingleMeeting
										Slug={meeting.slug}
										Img={meeting.img}
										Title={meeting.title}
										Date={meeting.date}
										Time={meeting.time}
										Link={meeting.link}
									/>
								</div>
							);
						}).slice(0, 6)
					}
				</div>
			</div>
      	</div>
	)
}
